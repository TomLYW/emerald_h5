import {StyleSheet, View,Image,TouchableOpacity} from 'react-native'
import React from "react";


function HomeNav({navigation}) {
    return <View style={styles.content}>
        <Image style={styles.logo} source={require('../../../../asset/home/home_logo.png')}/>
        <TouchableOpacity onPress={() => {
            navigation.push("Notice");
        }}>
            <Image style={styles.newsLogo} source={require('../../../../asset/home/home_icon_news.png')}/>
        </TouchableOpacity>
    </View>
}

export default HomeNav;

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F5F5FA',
        height: 44,
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    logo: {
        height: 22,
        width: 118
    },
    newsLogo: {
        height: 24,
        width: 22
    }
});



