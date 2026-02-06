import LinearGradient from '@amazon-devices/react-linear-gradient';
import {
  HWEvent,
  useTVEventHandler,
} from '@amazon-devices/react-native-kepler';
import { VideoPlayer } from '@amazon-devices/react-native-w3cmedia';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useMediaControls } from '../hooks/useMediaControls';
import { COLORS } from '../styles/Colors';
import PlaybackControls from './PlaybackControls';
import Seekbar from './Seekbar';
import VideoPlayerHeader from './VideoPlayerHeader';

const EVENT_KEY_DOWN = 1;

enum DPADEventType {
  PLAY = 'play',
  PAUSE = 'pause',
  PLAYPAUSE = 'playPause',
  BACK = 'back',
  SELECT = 'select',
  SKIPFORWARD = 'skipForward',
  SKIPBACKWARD = 'skipBackward',
}

interface VideoPlayerUIProps {
  videoRef: React.MutableRefObject<VideoPlayer | null>;
  navigateBack: () => void;
  title: string;
}

const VideoPlayerUI = React.memo(
  ({ navigateBack, title, videoRef }: VideoPlayerUIProps) => {
    const [showMediaControls, setShowMediaControls] = useState(true);
    const { handleShowControls, handleShowControlsOnKeyEvent, cancelTimer } =
      useMediaControls(showMediaControls, setShowMediaControls);

    useEffect(() => {
      handleShowControls();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const playPauseVideo = useCallback(() => {
      const isVideoPaused = videoRef.current?.paused;
      if (videoRef.current) {
        isVideoPaused ? videoRef.current.play() : videoRef.current.pause();
      }
    }, [videoRef]);

    useTVEventHandler((evt: HWEvent) => {
      if (!Platform.isTV) {
        return;
      }

      if (evt && evt.eventKeyAction === EVENT_KEY_DOWN) {
        showMediaControls
          ? handleShowControlsOnKeyEvent()
          : handleShowControls();

        if (videoRef.current) {
          switch (evt.eventType) {
            case DPADEventType.SELECT: {
              if (!showMediaControls) {
                playPauseVideo();
              }
              break;
            }
          }
        }
      }
    });

    const seekBarRef = useRef<any>(null);

    return (
      <View style={styles.uiContainer} testID="video-player-ui-view">
        {showMediaControls && (
          <LinearGradient
            colors={[
              COLORS.SEMI_TRANSPARENT,
              COLORS.TRANSPARENT,
              COLORS.SEMI_TRANSPARENT,
            ]}
            style={styles.ui}>
            <VideoPlayerHeader navigateBack={navigateBack} title={title} />

            <PlaybackControls videoRef={videoRef} />

            <Seekbar
              seekBarRef={seekBarRef}
              videoRef={videoRef}
              handleShowControlsOnKeyEvent={handleShowControlsOnKeyEvent}
            />
          </LinearGradient>
        )}
      </View>
    );
  },
);

export default VideoPlayerUI;

const styles = StyleSheet.create({
  ui: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  uiContainer: {
    position: 'absolute',
    zIndex: 5,
    height: '100%',
    width: '100%',
  },
});
