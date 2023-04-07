import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import moment from "moment";

function NoticeList({navigation,item}) {
    return <TouchableWithoutFeedback onPress={() => {
        navigation.push('NoticeDetail',{id:item.id})
    }}>
        <View style={{...styles.whiteBox}}>
            <View style={{...styles.column, alignItems: 'flex-start', margin: 15}}>
                <View style={{...styles.row, justifyContent: 'flex-start', marginBottom: 10}}>
                    <Text style={{fontSize: 16, color: "#333333"}}>{item.title}</Text>
                    {/*<View style={{width: 8, height: 8, backgroundColor: '#05AA84', borderRadius: 4, marginLeft: 5}}/>*/}
                </View>
                <Text ellipsizeMode={'tail'} numberOfLines={2} style={{fontSize: 14, color: "#666666", marginBottom: 10,maxHeight:50,lineHeight:18}}>{item.content}</Text>
                <Text style={{fontSize: 12, color: "#999999"}}>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
}

export default NoticeList

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    whiteBox: {
        flex: 1,

        backgroundColor: '#fff',
        borderRadius: 15,

        marginTop: 5,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,

        shadowColor: '#000',
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
    }
});
