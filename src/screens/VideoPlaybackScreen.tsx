import {
  BackHandler,
  HWEvent,
  useKeplerAppStateManager,
  useTVEventHandler,
} from '@amazon-devices/react-native-kepler';
import {
  KeplerVideoSurfaceView,
  VideoPlayer,
} from '@amazon-devices/react-native-w3cmedia';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import BufferingWindow from '../components/BufferingWindow';
import ErrorView from '../components/ErrorView';
import VideoPlayerUI from '../components/VideoPlayerUI';
import { COLORS } from '../styles/Colors';
import { VideoData, VideoHandler } from '../utils/VideoHandler';

const EVENT_KEY_DOWN = 1;
const TIME_TO_GO_BACK_IF_VIDEO_ENDS = 2300;
const BACK_NAVIGATION_DELAY = 700;

const VideoPlaybackScreen = ({navigation, route}: any) => {
  const video = route.params.video;
  const videoData: VideoData = {
    uri: video.videoURL,
    title: video.title,
    format: 'MP4',
  };

  const {width: deviceWidth, height: deviceHeight} = useWindowDimensions();

  const [showBuffering, setShowBuffering] = React.useState<boolean>(true);
  const [isVideoInitialized, setIsVideoInitialized] =
    React.useState<boolean>(false);
  const [isVideoEnded, setVideoEnded] = React.useState<boolean>(false);
  const [isVideoError, setVideoError] = React.useState<boolean>(false);
  const [videoPlayElapsedTimeM, setVideoPlayElapsedTimeM] =
    React.useState<number>(0);

  const surfaceHandle = useRef<string | null>(null);
  const timer = useRef<null | ReturnType<typeof setTimeout> | number>(null);
  const videoRef = useRef<VideoPlayer | null>(null);

  const keplerAppStateManager = useKeplerAppStateManager();
  const componentInstance = keplerAppStateManager.getComponentInstance();

  const showVideoPlayerUI = !isVideoError;

  const videoHandler = new VideoHandler(
    videoRef,
    videoData,
    setIsVideoInitialized,
    setVideoEnded,
    setVideoError,
    setVideoPlayElapsedTimeM,
    setShowBuffering,
  );

  // Handle TV remote key events -- cancel auto-back if user presses a key
  useTVEventHandler((evt: HWEvent) => {
    if (!Platform.isTV) {
      return;
    }
    if (evt && evt.eventKeyAction === EVENT_KEY_DOWN) {
      if (isVideoEnded) {
        clearTimeout(Number(timer.current));
        setVideoEnded(false);
      }
    }
  });

  // Auto-navigate back when video ends
  useEffect(() => {
    if (!isVideoEnded) {
      return;
    }
    timer.current = setTimeout(() => {
      navigateBack();
    }, TIME_TO_GO_BACK_IF_VIDEO_ENDS);

    return () => clearTimeout(Number(timer.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoEnded]);

  // Initialize video player on mount
  useEffect(() => {
    videoHandler.preBufferVideo(componentInstance);

    if (Platform.isTV) {
      BackHandler.addEventListener('hardwareBackPress', navigateBack);
    }

    return () => {
      if (Platform.isTV) {
        BackHandler.removeEventListener('hardwareBackPress', navigateBack);
      }
      clearTimeout(Number(timer.current));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide buffering on error
  useEffect(() => {
    if (isVideoError) {
      setShowBuffering(false);
    }
  }, [isVideoError]);

  // Clean up video player on unmount
  useEffect(() => {
    return () => {
      if (videoRef?.current) {
        surfaceHandle.current = null;
        videoRef.current?.clearSurfaceHandle('');
        videoHandler.destroyVideoElements();
        videoRef.current = null;
        clearTimeout(Number(timer.current));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateBack = useCallback(() => {
    surfaceHandle.current = null;
    videoRef?.current?.clearSurfaceHandle('');
    videoHandler.destroyVideoElements();
    videoRef.current = null;
    clearTimeout(Number(timer.current));

    setTimeout(() => navigation.goBack(), BACK_NAVIGATION_DELAY);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playVideo = useCallback(async () => {
    try {
      await videoRef?.current?.play();
      setShowBuffering(false);
    } catch (error) {
      console.error('[VideoPlaybackScreen] Error playing video:', error);
      navigateBack();
    }
  }, [videoRef, navigateBack]);

  const setSurface = useCallback(async () => {
    if (surfaceHandle.current) {
      videoRef.current?.setSurfaceHandle(surfaceHandle.current);
      playVideo();
    }
  }, [playVideo]);

  const onSurfaceViewCreated = useCallback(
    (_surfaceHandle: string): void => {
      surfaceHandle.current = _surfaceHandle;
      setSurface();
    },
    [setSurface],
  );

  const onSurfaceViewDestroyed = useCallback(
    (_surfaceHandle: string): void => {
      videoRef.current?.clearSurfaceHandle(_surfaceHandle);
    },
    [],
  );

  return (
    <View style={styles.playerContainer}>
      <View
        style={[
          styles.surfaceContainer,
          {
            width: deviceWidth,
            height: deviceHeight,
          },
        ]}>
        {isVideoInitialized && (
          <KeplerVideoSurfaceView
            style={styles.videoSurface}
            onSurfaceViewCreated={onSurfaceViewCreated}
            onSurfaceViewDestroyed={onSurfaceViewDestroyed}
            testID="kepler-video-surface-view"
          />
        )}

        {showBuffering && (
          <BufferingWindow backgroundColor={COLORS.SEMI_TRANSPARENT} />
        )}
        {showVideoPlayerUI && (
          <VideoPlayerUI
            videoRef={videoRef}
            navigateBack={navigateBack}
            title={videoData.title}
          />
        )}
        {isVideoError && <ErrorView navigateBack={navigateBack} />}
      </View>
    </View>
  );
};

export default VideoPlaybackScreen;

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: COLORS.GRAY,
    height: '100%',
  },
  surfaceContainer: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'stretch',
  },
  videoSurface: {
    zIndex: 0,
  },
});
