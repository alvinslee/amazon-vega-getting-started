import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '../components';

const VideoPlaybackScreen = ({navigation, route}: any) => {
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.playerPlaceholder}>{route.params.videoURL}</Text>
      <View style={styles.buttonContainer}>
        <Button buttonText="Back" pressFunction={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 100,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  playerPlaceholder: {
    color: 'white',
    fontSize: 30,
  },
});

export default VideoPlaybackScreen;

