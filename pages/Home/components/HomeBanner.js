import {StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback, Alert} from 'react-native'
import React, {useEffect, useState, useCallback} from "react";
import Swiper from "react-native-swiper";
import {getBanner} from "../../../../services/other";
import useUserInfo from "../../../../hook/useUserInfo";

const {width} = Dimensions.get("window");

function HomeBanner({navigation,refresh}) {

    const [banners, setBanners] = useState([]);
    const {language} = useUserInfo();
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        getBanner().then(response => {
            if (response.data.code === 0) {
                setBanners(response.data.data);
                setShow(true);
            }
        }).catch(error => {
            console.log(error)
        })
    }, [language,refresh])
   
    function Item({url,image,id}) {
        return (
            <TouchableWithoutFeedback onPress={() => {

                // console.log("url:" + url);

                if (Number(id) > 0) {
                    navigation.push("CloudPowerDetails",{id:id})
                }else{
                    if (url !== undefined) {
                        if (url.length > 0) {
                            navigation.push("BBrowser",{url:url})
                        }
                    }
                }
            }}>
                <View style={styles.content}>
                    <Image style={styles.banner}
                           source={{uri: image}}
                           resizeMode={'cover'}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return show ?<Swiper style={{height: (width - 30) / 345 * 150}}
                autoplay
                dotColor={'rgba(255,255,255,0.5)'}
                activeDotColor={'#FFFFFF'}
                paginationStyle={{bottom: 15}}
                autoplayTimeout={3.5}
                removeClippedSubviews={false}
    >
        {
            banners.map((item) => (
                <Item key={item.id} url={item.url} image={item.image} id={item.cloudMinerId}/>
            ))
        }
    </Swiper>:null

}

export default HomeBanner;

const styles = StyleSheet.create({
    content: {
        height: (width - 30) / 345 * 150,
        width: width,
    },
    banner: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        height: (width - 30) / 345 * 150,
        width: width - 30,
        borderRadius: 15,
        backgroundColor:'#E7E7E7'
    },
});


