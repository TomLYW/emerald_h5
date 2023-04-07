import React, {useState, useEffect} from 'react';
import {DeviceEventEmitter, FlatList} from 'react-native';
import HomeNav from './components/HomeNav';
import HomeBanner from './components/HomeBanner';
import YunList from './components/YunList';
import HomeMiddle from './components/HomeMiddle';
import PageBase from '../../UI/PageBase/PageBase';
import {getCloudMiner} from '../../../services/cloudMiner';
import useUserInfo from '../../../hook/useUserInfo';
import NoMoreData from '../../UI/NoMoreData/NoMoreData';

function Home({navigation}) {
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshID, setRefreshID] = useState(0);
  const {language} = useUserInfo();

  useEffect(() => {
    loadData();
  }, [language]);

  useEffect(() => {
    DeviceEventEmitter.addListener('exchange_tab', name => {
      if (name === 'Home') {
        loadData();
      }
    });
  }, []);

  function loadData() {
    getCloudMiner({isRecommend: 1})
      .then(response => {
        if (response.data.code === 0) {
          setListData(response.data.data);
        }
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return <HomeBanner navigation={navigation} refresh={refreshID} />;
    } else if (index === 1) {
      return <HomeMiddle navigation={navigation} refresh={refreshID} />;
    } else {
      return <YunList navigation={navigation} item={item} />;
    }
  };

  return (
    <PageBase>
      <HomeNav navigation={navigation} />
      <FlatList
        data={[{id: 'banner'}, {id: 'middle'}].concat(listData)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={() => {
          //下拉刷新
          setRefreshing(true);
          setRefreshID(refreshID + 1);
          loadData();
        }}
        ListFooterComponent={NoMoreData}
      />
    </PageBase>
  );
}

export default Home;
