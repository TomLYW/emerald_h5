import {StyleSheet, View, Text, Image,TouchableWithoutFeedback} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React from "react";
import I18n from '../../../../language';
import {BToast} from "../../../../context/BToastProvide";
import {whetherExceedDate,accMul} from "../../../../util/utils";
import {getMealType} from '../../../../services/other';

function YunList({navigation,item}) {

    function showMaskType() {

        //是否售罄
        if (Number(item.stock) === 0) {
            return 2;
        }

        //判断是否结束出售
        if (whetherExceedDate(item.deployTime)){
            return 1;
        }

        return 0
    }

    return <TouchableWithoutFeedback onPress={() => {
        navigation.push("CloudPowerDetails",{id:item.id})
    }}>
        <View style={styles.content}>
            <View style={{...styles.tag,backgroundColor:getMealType(item.type).bgColor}}>
                <Text style={styles.tagTitle}>{getMealType(item.type).text}</Text>
            </View>
            <View style={styles.head}>
                <View style={styles.row}>
                    {
                        item.currency === 'BTC' ? <Image style={styles.icon} source={require('../../../../asset/home/home_icon_btc.png')}/> : <Image style={styles.icon} source={require('../../../../asset/home/home_icon_eth.png')}/>
                    }
                    <Text style={styles.title}>{item.name}{item.model}</Text>
                </View>
                <Text style={styles.price}>{Number(item.price).toFixed(2)} U</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.bottom}>
                <View style={styles.bottomList}>
                    <Text style={styles.blackTitle}>{item.duration}{I18n.t('天')}</Text>
                    <Text style={styles.grayTitle}>{I18n.t('期限')}</Text>
                </View>
                <View style={styles.bottomList}>
                    <Text style={styles.blackTitle}>{item.power} {item.currency === 'BTC' ? 'TH/s' : 'MH/s'}</Text>
                    <Text style={styles.grayTitle}>{I18n.t('规格')}</Text>
                </View>
                <View style={{...styles.bottomList,marginRight:10}}>
                    <Text style={styles.themeTitle}>{accMul(item.yieldRate,100).toFixed(2)}%</Text>
                    <Text style={styles.grayTitle}>{I18n.t('历史产出率')}</Text>
                </View>
                <View style={styles.line2}/>

                <AnimatedCircularProgress
                    style={{marginLeft: 15}}
                    size={50}
                    width={3}
                    rotation={0}
                    fill={(Number(item.sold) / (Number(item.sold) + Number(item.stock)) * 100)}
                    tintColor="rgba(5, 170, 132, 1)"
                    backgroundColor="rgba(5, 170, 132, 0.2)">
                    {
                        () => (
                            <View style={styles.bottomRight}>
                                <Text
                                    style={{...styles.themeTitle,}}>{(Number(item.sold) / (Number(item.sold) + Number(item.stock)) * 100).toFixed(0)}%</Text>
                                <Text style={{...styles.grayTitle,marginTop:0}}>{I18n.t('已售')}</Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
            {
                showMaskType() > 0 && <View style={styles.maskView}>
                    {
                        showMaskType() === 2 && <Image  style={{width:122,height:73}} source={require('../../../../asset/home/home_icon_soldout.png')}/>
                    }
                    {
                        showMaskType() === 1 &&  <Image  style={{width:122,height:73}} source={require('../../../../asset/home/home_icon_ended.png')}/>
                    }
                </View>
            }

        </View>
    </TouchableWithoutFeedback>
}

export default YunList;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        height: 150,

        backgroundColor: '#fff',
        borderRadius: 15,

        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5,

        shadowColor: '#000',
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    icon: {
        width: 17,
        height: 17,
        marginRight: 5,
    },
    tag: {
        width: 70,
        height: 18,
        backgroundColor: '#05AA84',
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    tagTitle: {
        width: 70,
        height: 18,
        fontSize: 11,
        color: '#fff',
        lineHeight: 18,
        textAlign: 'center',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        height: 48,
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        color: '#FF8519',
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        backgroundColor: '#E6E6E6',
        marginLeft: 15,
        marginRight: 15,
    },
    line2: {
        height: 40,
        width: 1,
        backgroundColor: '#E6E6E6',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 15,
    },
    grayTitle: {
        fontSize: 12,
        color: '#999999',
        textAlign: "center",
        marginTop: 5,
    },
    blackTitle: {
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold',
        textAlign: "center",
    },
    themeTitle: {
        fontSize: 14,
        color: '#05AA84',
        fontWeight: 'bold',
        textAlign: "center",
    },
    bottomRight: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
    },
    bottomList: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
    },
    maskView:{
        width:'100%',
        height: 150,

        backgroundColor: 'rgba(0,0,0,0.1)',
        position: 'absolute',

        borderRadius: 15,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
