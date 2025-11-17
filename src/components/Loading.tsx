import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => {
  return (
    <View
      style={{
        height: 500,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Loading;
