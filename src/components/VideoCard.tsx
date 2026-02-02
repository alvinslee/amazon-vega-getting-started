
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {resolveImageSource} from '../utils/assetResolver';

interface IProps {
  title: string;
  imgURL: string;
  description: string;
  pressFunction: Function;
}

const VideoCard = ({title, imgURL, description, pressFunction}: IProps) => {
  const [focused, setFocused] = useState(false);
  const imageSource = resolveImageSource(imgURL);

  return (
    <TouchableOpacity
      style={[
        styles.videoCardContainer,
        focused ? styles.focused : styles.unfocused,
      ]}
      onPress={() => pressFunction()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}>
      <Image style={styles.videoImage} source={imageSource} />
      <View style={styles.videoTextContainer}>
        <Text style={styles.videoTitle}>{title}</Text>
        <Text style={styles.videoDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoCardContainer: {
    height: 400,
    width: 550,
    margin: 10,
    borderRadius: 5,
  },
  unfocused: {
    borderWidth: 1,
    borderColor: 'white',
  },
  focused: {
    borderWidth: 5,
    borderColor: 'yellow',
  },
  videoTextContainer: {
    height: '25%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 10,
  },
  videoImage: {
    height: '75%',
    width: '100%',
    resizeMode: 'cover',
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  videoDescription: {
    color: 'white',
  },
});

export default VideoCard;

