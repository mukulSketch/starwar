import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Module = () => {
  const [moduleArray, setModuleArray] = useState(['1', '2', '3', '4', '5']);
  const [module, setModule] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [topic, setTopic] = useState(1);
  return (
    <View>
      {moduleArray.map((res, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setModule(res);
              setChapter(1);
              setTopic(1);
            }}
            key={index}
            style={{
              backgroundColor: res == module ? 'crimson' : '#d5d5d5',
              padding: 7,
            }}>
            <Text>Module {res}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={{margin: 20}} />
      {moduleArray.map((res, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setChapter(res);
              setTopic(1);
            }}
            key={index}
            style={{
              backgroundColor: res == chapter ? 'crimson' : '#d5d5d5',
              padding: 7,
            }}>
            <Text>
              Chapter {module}-{res}
            </Text>
          </TouchableOpacity>
        );
      })}
      <View style={{margin: 20}} />
      {moduleArray.map((res, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setTopic(res);
            }}
            key={index}
            style={{
              backgroundColor: res == topic ? 'crimson' : '#d5d5d5',
              padding: 7,
            }}>
            <Text>
              Topic {module}-{chapter}-{res}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Module;
