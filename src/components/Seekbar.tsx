import { SeekBar as KUICSeekbar } from '@amazon-devices/kepler-ui-components';
import { TVFocusGuideView } from '@amazon-devices/react-native-kepler';
import { VideoPlayer } from '@amazon-devices/react-native-w3cmedia';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../styles/Colors';
import { formatTime } from '../utils/commonFunctions';
import { scaleUxToDp } from '../utils/pixelUtils';

const DEFAULT_TIME_TEXT = '00:00';
const SEEKBAR_STEP = 10;
const STEP_MULTIPLIER_FACTOR = 1;
const STEP_MULTIPLIER_INTERVAL = 1000;
const LONG_PRESS_INTERVAL_DURATION = 200;
const LONG_PRESS_DELAY = 1000;
const MAX_STEP_VALUE = 50;
const ANIMATION_DURATION = 200;

const Seekbar = ({
  videoRef,
  seekBarRef,
  handleShowControlsOnKeyEvent,
}: {
  videoRef: React.MutableRefObject<VideoPlayer | null>;
  seekBarRef: React.MutableRefObject<null>;
  handleShowControlsOnKeyEvent: () => void;
}) => {
  const [progress, setProgress] = useState<number>(
    videoRef.current?.currentTime || 0,
  );
  const [isSkipping, setIsSkipping] = useState(false);
  const isSkippingRef = useRef(false);
  const totalValue = videoRef.current?.duration;

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current && !isSkippingRef.current) {
        setProgress(videoRef.current.currentTime);
      }
    };
    const intervalProgress = setInterval(updateProgress, 1000);
    return () => clearInterval(intervalProgress);
  }, [videoRef]);

  const seek = (value: number) => {
    if (typeof videoRef.current?.currentTime === 'number') {
      setProgress(value);
      videoRef.current.fastSeek(value);
      videoRef.current.play();
      isSkippingRef.current = false;
    }
  };

  const pauseVideo = () => {
    if (!videoRef?.current?.paused) {
      videoRef.current?.pause();
    }
  };

  const handleOnSlidingStart = () => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
  };

  const handleOnSlidingEnd = () => {
    setIsSkipping(true);
    isSkippingRef.current = true;
  };

  const onRewindPressHandler = () => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
  };

  const onFastForwardPressHandler = () => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
  };

  const onChangeValueHandler = useCallback(() => {
    if (isSkippingRef.current) {
      handleShowControlsOnKeyEvent();
    }
  }, [handleShowControlsOnKeyEvent]);

  const onPressSelectButtonHandler = (value: number) => {
    if (isSkippingRef.current) {
      setIsSkipping(false);
      seek(value);
    } else {
      videoRef.current?.paused
        ? videoRef.current?.play()
        : videoRef.current?.pause();
    }
  };

  const onPressPlayPauseButtonHandler = (value: number) => {
    if (isSkippingRef.current) {
      setIsSkipping(false);
      seek(value);
    }
  };

  const getIndicatorColor = (focusedValue: boolean) =>
    focusedValue ? COLORS.ORANGE : COLORS.GRAY;

  const getThumbnailLabel = (thumbnailLabel: number) =>
    formatTime(thumbnailLabel);

  return totalValue ? (
    <View style={styles.container}>
      <View style={styles.controls}>
        <View>
          <Text style={styles.time}>
            {progress ? formatTime(progress) : DEFAULT_TIME_TEXT}
          </Text>
        </View>
        <TVFocusGuideView
          style={styles.seekbar}>
          <KUICSeekbar
            ref={seekBarRef}
            currentValue={progress}
            totalValue={totalValue}
            disabledWhenNotFocused={true}
            disableThumbnail={!isSkipping}
            step={SEEKBAR_STEP}
            stepMultiplierFactor={STEP_MULTIPLIER_FACTOR}
            stepMultiplierFactorInterval={STEP_MULTIPLIER_INTERVAL}
            longPressIntervalDuration={LONG_PRESS_INTERVAL_DURATION}
            longPressDelay={LONG_PRESS_DELAY}
            maxStepValue={MAX_STEP_VALUE}
            trapFocus={false}
            enableSkipForwardBackwardAcceleration={true}
            enableLongPressAcceleration={true}
            enableAnimations={true}
            animationDuration={ANIMATION_DURATION}
            thumbnailLabel={getThumbnailLabel}
            currentValueIndicatorColor={getIndicatorColor}
            onValueChange={onChangeValueHandler}
            onSlidingStart={handleOnSlidingStart}
            onSlidingEnd={handleOnSlidingEnd}
            onFastForwardPress={onFastForwardPressHandler}
            onRewindPress={onRewindPressHandler}
            onPress={onPressSelectButtonHandler}
            onPlayPause={onPressPlayPauseButtonHandler}
            testID="kui-seekbar"
          />
        </TVFocusGuideView>
        <View>
          <Text style={styles.time}>{formatTime(totalValue)}</Text>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  controls: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    padding: scaleUxToDp(25),
    marginBottom: scaleUxToDp(80),
    zIndex: 2,
  },
  seekbar: {
    width: '90%',
    marginBottom: scaleUxToDp(10),
  },
  time: {
    color: COLORS.WHITE,
    fontSize: scaleUxToDp(25),
    marginHorizontal: 30,
  },
});

export default React.memo(Seekbar, (prevProps, nextProps) => {
  return (
    prevProps.videoRef === nextProps.videoRef &&
    prevProps.seekBarRef === nextProps.seekBarRef
  );
});
