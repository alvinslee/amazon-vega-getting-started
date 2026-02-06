import { VideoPlayer } from '@amazon-devices/react-native-w3cmedia';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PLAYER_BUTTON_SIZE } from '../utils/videoPlayerValues';
import PlayerButton from './PlayerButton';
import PlayPauseButton from './PlayPauseButton';

const DEFAULT_SEEK_TIME = 10;

export interface PlaybackControlsProps {
  videoRef: React.MutableRefObject<VideoPlayer | null>;
}

const seek = (
  seekSeconds: number,
  videoRef: React.MutableRefObject<VideoPlayer | null>,
) => {
  if (typeof videoRef.current?.currentTime === 'number') {
    const { currentTime, duration } = videoRef.current;
    let newTime = currentTime + seekSeconds;
    if (newTime > duration) {
      newTime = duration;
    } else if (newTime < 0) {
      newTime = 0;
    }
    videoRef.current.currentTime = newTime;
    if (videoRef.current.paused) {
      videoRef.current.play();
    }
  }
};

const PlaybackControls = ({ videoRef }: PlaybackControlsProps) => {
  const playPauseRef = useRef<any>(null);
  const skipBackwardRef = useRef<TouchableOpacity>(null);
  const skipForwardRef = useRef<TouchableOpacity>(null);

  useEffect(() => {
    playPauseRef?.current?.requestTVFocus();
  }, []);

  const handleSeekBackward = useCallback(() => {
    seek(-DEFAULT_SEEK_TIME, videoRef);
  }, [videoRef]);

  const handleSeekForward = useCallback(() => {
    seek(DEFAULT_SEEK_TIME, videoRef);
  }, [videoRef]);

  return (
    <View style={styles.playbackControls}>
      <PlayerButton
        key="player-btn-seek-backward"
        ref={skipBackwardRef}
        onPress={handleSeekBackward}
        icon="replay-10"
        testID="player-btn-seek-backward"
        size={PLAYER_BUTTON_SIZE}
      />
      <PlayPauseButton
        videoRef={videoRef}
        hasTVPreferredFocus
        size={PLAYER_BUTTON_SIZE}
      />
      <PlayerButton
        key="player-btn-seek-forward"
        ref={skipForwardRef}
        onPress={handleSeekForward}
        icon="forward-10"
        testID="player-btn-seek-forward"
        size={PLAYER_BUTTON_SIZE}
      />
    </View>
  );
};

export default React.memo(PlaybackControls);

const styles = StyleSheet.create({
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
