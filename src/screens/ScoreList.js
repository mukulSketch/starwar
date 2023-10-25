import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScoreList = ({route}) => {
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    scoreList();
  }, []);

  const scoreList = async () => {
    let score = await axios.get('https://www.jsonkeeper.com/b/JNYL');
    setScoreData(score.data);
  };
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#e8e8e8',
          padding: 11,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 19,
            textAlign: 'center',
          }}>
          {route.params.playerName}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#e8e8e8',
          padding: 13,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 18,
          }}>
          Matches
        </Text>
      </View>
      {scoreData.map((res, index) => {
        return (
          <View
            style={{
              padding: 6,
              paddingBottom: 15,
              paddingTop: 15,
            //   borderBottomWidth: 1,
            //   borderBottomColor: '#d5d5d5',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor:
                res.player1.score > res.player2.score
                  ? '#7fff7d'
                  : res.player1.score == res.player2.score
                  ? '#fff'
                  : '#ff7979',
            }}
            key={index}>
            <Text style={{color: '#000', fontSize: 18}}>Player 1 </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#000', fontSize: 18}}>
                {res.player1.score} -{' '}
              </Text>
              <Text style={{color: '#000', fontSize: 18}}>
                {res.player2.score}{' '}
              </Text>
            </View>
            <Text style={{color: '#000', fontSize: 18}}>Player 2</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default ScoreList;
