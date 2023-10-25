import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScoreList = ({route}) => {
  const [scoreData, setScoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    scoreList();
  }, []);

  const scoreList = async () => {
    try {
      let score = await axios.get('https://www.jsonkeeper.com/b/JNYL');
      setScoreData(score.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.main}>
        <Text style={styles.playerName}>{route.params.playerName}</Text>
      </View>
      <View style={styles.secondBox}>
        <Text style={styles.secondBoxText}>Matches</Text>
      </View>
      {loading ? (
        <ActivityIndicator color={'#45474B'} size={50} />
      ) : (
        <View>
          {scoreData.map((res, index) => {
            return (
              <View
                style={[
                  styles.scoreRow,
                  {
                    backgroundColor:
                      res.player1.score > res.player2.score
                        ? '#7fff7d'
                        : res.player1.score == res.player2.score
                        ? '#fff'
                        : '#ff7979',
                  },
                ]}
                key={index}>
                <Text style={styles.scoreRowText}>Player 1 </Text>
                <View style={styles.boxAlign}>
                  <Text style={styles.scoreRowText}>
                    {res.player1.score} -{' '}
                  </Text>
                  <Text style={styles.scoreRowText}>{res.player2.score} </Text>
                </View>
                <Text style={styles.scoreRowText}>Player 2</Text>
              </View>
            );
          })}
        </View>
      )}
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
  playerName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
  },
  secondBox: {
    backgroundColor: '#e8e8e8',
    padding: 13,
  },
  secondBoxText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  scoreRow: {
    padding: 6,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  scoreRowText: {
    color: '#000',
    fontSize: 18,
  },
  boxAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ScoreList;
