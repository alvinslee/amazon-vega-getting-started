import { VideoPlayer } from '@amazon-devices/react-native-w3cmedia';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import PlayerButton from './PlayerButton';

export interface PlayPauseButtonProps {
  videoRef: React.MutableRefObject<VideoPlayer | null>;
  onBlur?: () => void;
  hasTVPreferredFocus?: boolean;
  size: number;
}

const PlayPauseButton = React.forwardRef(
  (
    { videoRef, onBlur, hasTVPreferredFocus, size }: PlayPauseButtonProps,
    ref: React.ForwardedRef<TouchableOpacity>,
  ) => {
    const initialPlayingState =
      !videoRef.current?.paused && !videoRef.current?.ended;
    const [playing, setPlaying] = useState<boolean>(initialPlayingState);

    const onPause = useCallback(() => setPlaying(false), []);
    const onPlay = useCallback(() => setPlaying(true), []);
    const onEndedUpdate = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }, [videoRef]);

    useEffect(() => {
      const video = videoRef.current;
      video?.addEventListener('play', onPlay);
      video?.addEventListener('pause', onPause);
      video?.addEventListener('ended', onEndedUpdate);
      return () => {
        video?.removeEventListener('play', onPlay);
        video?.removeEventListener('pause', onPause);
        video?.removeEventListener('ended', onEndedUpdate);
      };
    }, [videoRef, onPlay, onPause, onEndedUpdate]);

    const pause = useCallback(() => {
      videoRef?.current?.pause();
    }, [videoRef]);

    const play = useCallback(() => {
      videoRef?.current?.play();
    }, [videoRef]);

    return (
      <PlayerButton
        onPress={playing ? pause : play}
        icon={playing ? 'pause' : 'play-arrow'}
        size={size}
        ref={ref}
        hasTVPreferredFocus={hasTVPreferredFocus}
        onBlur={onBlur}
        testID="player-btn-play-pause"
      />
    );
  },
);

export default PlayPauseButton;
