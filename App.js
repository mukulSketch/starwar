import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PointTable from './src/screens/PointTable';
import ScoreList from './src/screens/ScoreList';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PointTable">
          <Stack.Screen
          name="PointTable"
          component={PointTable}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ScoreList"
          component={ScoreList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
