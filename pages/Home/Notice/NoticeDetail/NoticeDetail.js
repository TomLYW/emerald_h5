import React, {useEffect,useState} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import PageBase from "../../../../UI/PageBase/PageBase";
import {getNoticeDetail} from "../../../../../services/other";
import moment from "moment";

function NoticeDetail({route}) {

    const [item ,setItem] = useState({});

    useEffect(() => {

        getNoticeDetail({id:route.params.id}).then(response => {
            if (response.data.code === 0) {
                setItem(response.data.data);
            }
        }).catch(error => {
            console.log(error);
        })

    }, []);

    return (
        <PageBase>
            <ScrollView style={{...styles.content, ...styles.column}}>
                <Text style={{fontSize: 18, color: "#333333", marginBottom: 10, marginTop: 10,fontWeight:'bold'}}>{item.title}</Text>
                <Text style={{fontSize: 14, color: "#999999", marginBottom: 10}}>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text style={{fontSize: 16, color: "#555555",lineHeight:21}}>{item.content}</Text>
            </ScrollView>
        </PageBase>
    )
}

export default NoticeDetail;

const styles = StyleSheet.create({
    content: {
        marginLeft: 15,
        marginRight: 15,
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    column: {
        flex: 1,
        flexDirection: 'column'
    }
});
