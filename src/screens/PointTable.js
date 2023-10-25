import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PointTable = ({navigation}) => {
  const [tableData, setTableData] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    pointData();
  }, []);

  const sortTableData = (data, isAscending) => {
    return data.slice().sort((a, b) => {
      return isAscending ? a.score - b.score : b.score - a.score;
    });
  };

  const changeOrder = () => {
    setLoading(true);
    const sortedData = sortTableData(tableData, !ascending);
    setAscending(!ascending);
    setTableData(sortedData);
    setLoading(false);
  };

  const pointData = async () => {
    try {
      let list = await axios.get('https://www.jsonkeeper.com/b/IKQQ');
      for (var n of list.data) {
        n.score = parseInt((Math.random() * 100));
      }
      setTableData(list.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.main}>
        <Text style={styles.heading}>Star Wars Blaster Tournament</Text>
      </View>
      <View style={styles.subHeadingBox}>
        <Text style={styles.subHeading}>Points Table</Text>
        <TouchableOpacity
          onPress={() => {
            changeOrder();
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
            }}>
            {ascending ? 'Descending' : 'Ascending'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 7}}>
        {loading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'#45474B'} size={50} />
          </View>
        ) : (
          <View>
            {tableData.map((res, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ScoreList', {playerName: res.name});
                  }}
                  style={styles.playerCard}
                  key={index}>
                  <Image style={styles.playerIcon} source={{uri: res.icon}} />
                  <View style={styles.detailBox}>
                    <Text style={styles.playerDetails}>{res.name}</Text>
                    <Text style={styles.playerDetails}>{res.score}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e8e8e8',
    padding: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  heading: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
  },
  subHeadingBox: {
    backgroundColor: '#e8e8e8',
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeading: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  playerCard: {
    padding: 6,
    paddingBottom: 12,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIcon: {
    aspectRatio: 128 / 128,
    width: 70,
  },
  detailBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  playerDetails: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000',
  },
});
export default PointTable;
