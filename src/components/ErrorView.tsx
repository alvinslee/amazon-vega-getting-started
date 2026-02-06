import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/Colors';
import VideoPlayerHeader from './VideoPlayerHeader';

interface ErrorViewProps {
  navigateBack: () => void;
}

const ErrorView = ({ navigateBack }: ErrorViewProps) => {
  return (
    <View style={styles.mainContainer}>
      <VideoPlayerHeader navigateBack={navigateBack} />
      <View style={styles.errorContainer}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            An error occurred during playback.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.BLACK,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  errorBox: {
    height: '30%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: COLORS.WHITE,
  },
  errorText: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
    padding: 20,
  },
});
