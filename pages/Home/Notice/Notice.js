import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PageBase from "../../../UI/PageBase/PageBase";
import NoticeList from "./components/NoticeList";
import {getNotice} from "../../../../services/other";
import Placeholder from "../../../UI/Placeholder";

function Notice ({navigation}) {

    const [listData,setListData] = useState([]);
    useEffect(() => {
        getNotice({page:1,limit:100}).then(response => {
            if (response.data.code === 0) {
                setListData(response.data.data);
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const renderItem = ({item}) => {
        return  (
            <NoticeList navigation={navigation} item={item}/>
        )
    };

    return (
        <PageBase>
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => (item.id)}
                ListEmptyComponent={Placeholder}
            />
        </PageBase>
    )
}

export default Notice;


const styles = StyleSheet.create({

});
