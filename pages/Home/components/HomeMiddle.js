import {StyleSheet, View, Image, Text,TouchableWithoutFeedback} from 'react-native'
import React, {useEffect, useState} from "react";
import {getNotice} from "../../../../services/other";
import moment from "moment";
import I18n from "../../../../language/index"
import useUserInfo from "../../../../hook/useUserInfo";

function HomeMiddle({navigation,refresh}) {

    const [show,setShow] = useState(false);
    const [listData,setListData] = useState([]);
    const {language} = useUserInfo();

    useEffect(() => {
        getNotice({page:1,limit:100}).then(response => {
            if (response.data.code === 0) {
                setListData(response.data.data);
                setShow(true);
            }
        }).catch(error => {
            console.log(error)
        })
    }, [language,refresh])

    return <View style={styles.content}>

        {
            listData.length > 0 && (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.push('NoticeDetail',{id:listData[0].id})
                }}>
                    <View style={styles.cell}>
                        <Image style={{width: 40, height: 40, marginTop: 15, marginLeft: 15}}
                               source={require('../../../../asset/home/home_icon_notice.png')}/>
                        <View style={styles.middle}>
                            <Text style={styles.title}>{listData[0].title}</Text>
                            <Text style={styles.time}>{moment(listData[0].createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>
                        <Image style={{width: 26, height: 26, marginTop: 22, marginRight: 15}}
                               source={require('../../../../asset/home/home_icon_rightarrow.png')}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        {
            show && <View style={styles.bottom}>
                <Image style={{width: 6, height: 18, marginLeft: 15,marginRight:10}}
                       source={require('../../../../asset/home/title_icon.png')}/>
                <Text style={styles.bigTitle}>{I18n.t('推荐矿机共享服务')}</Text>
            </View>
        }

    </View>
}

export default HomeMiddle;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 10,
    },
    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        height: 70,

        backgroundColor: '#fff',
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 7.5,
        marginBottom: 7.5,

        shadowColor: '#000',
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    middle: {
        flex: 2,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom:3,
    },
    time: {
        fontSize: 12,
        color: '#999999',
        marginTop: 2,
    },
    bottom: {
        flex: 1,
        height: 50,
        flexDirection:'row',
        alignItems:'center',
    },
    bigTitle: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    }
});

