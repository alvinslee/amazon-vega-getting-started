
import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import {Button} from '../components';
import {resolveImageSource} from '../utils/assetResolver';

const VideoDetailScreen = ({navigation, route}: any) => {
  const video = route.params.video;
  const imageSource = resolveImageSource(video.imgURL);

  return (
    <ImageBackground
      source={imageSource}
      imageStyle={styles.image}
      style={styles.screenContainer}>
      <Text style={styles.videoTitle}>{video.title}</Text>
      <Text style={styles.videoDescription}>{video.description}</Text>
      <View style={styles.buttonContainer}>
        <Button
          buttonText="Watch Now"
          pressFunction={() =>
            navigation.navigate('VideoPlaybackScreen', {
              video: video,
            })
          }
        />
        <Button buttonText="Back" pressFunction={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    opacity: 0.2,
  },
  screenContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 50,
    color: 'white',
    fontWeight: '700',
    margin: 30,
  },
  videoDescription: {
    color: 'white',
    fontSize: 30,
    margin: 30,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    width: '18%',
  },
});

export default VideoDetailScreen;

