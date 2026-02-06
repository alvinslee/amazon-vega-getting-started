import { IComponentInstance } from '@amazon-devices/react-native-kepler';
import {
  KeplerMediaControlHandler,
  VideoPlayer,
} from '@amazon-devices/react-native-w3cmedia';
import React from 'react';
import { SKIP_INTERVAL_SECONDS } from './videoPlayerValues';

export interface VideoData {
  uri: string;
  title: string;
  format: string;
}

type MediaPlayerDeInitStatus = 'success' | 'timedout' | 'invalid';

export class VideoHandler {
  public videoRef: React.MutableRefObject<VideoPlayer | null>;
  public data: VideoData;
  public setIsVideoInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  public setIsVideoEnded: React.Dispatch<React.SetStateAction<boolean>>;
  public setIsVideoError: React.Dispatch<React.SetStateAction<boolean>>;
  public setVideoPlayElapsedTimeM: React.Dispatch<React.SetStateAction<number>>;
  public setShowBuffering: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(
    videoRef: React.MutableRefObject<VideoPlayer | null>,
    data: VideoData,
    setIsVideoInitialized: React.Dispatch<React.SetStateAction<boolean>>,
    setIsVideoEnded: React.Dispatch<React.SetStateAction<boolean>>,
    setIsVideoError: React.Dispatch<React.SetStateAction<boolean>>,
    setVideoPlayElapsedTimeM: React.Dispatch<React.SetStateAction<number>>,
    setShowBuffering: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    this.videoRef = videoRef;
    this.data = data;
    this.setIsVideoInitialized = setIsVideoInitialized;
    this.setIsVideoEnded = setIsVideoEnded;
    this.setIsVideoError = setIsVideoError;
    this.setVideoPlayElapsedTimeM = setVideoPlayElapsedTimeM;
    this.setShowBuffering = setShowBuffering;
  }

  preBufferVideo = async (componentInstance?: IComponentInstance) => {
    await this.destroyVideoElements();

    if (this.videoRef.current == null) {
      this.videoRef.current = new VideoPlayer();
    }

    // Register with Kepler Media Controls before initializing
    try {
      if (componentInstance) {
        await this.videoRef.current.setMediaControlFocus(
          componentInstance,
          new KeplerMediaControlHandler(),
        );
      }
    } catch (kmcError) {
      console.error('[VideoHandler] KMC setup error:', kmcError);
    }

    try {
      await this.videoRef.current.initialize();
      this.setupEventListeners();
      this.videoRef.current.autoplay = false;
      this.videoRef.current.defaultSeekIntervalInSec = SKIP_INTERVAL_SECONDS;
      this.loadVideoElements();
    } catch (error) {
      console.error('[VideoHandler] Failed to initialize video player:', error);
    }
  };

  loadVideoElements = () => {
    if (this.videoRef.current) {
      this.loadStaticMediaPlayer(this.videoRef.current);
    }
  };

  loadStaticMediaPlayer = (video: {
    src: string;
    autoplay: boolean;
    pause: () => void;
    load: () => void;
  }) => {
    video.src = this.data.uri;
    video.pause();
    video.load();
  };

  // Event handlers
  onLoadedMetaData = () => {
    if (this.videoRef.current) {
      this.setIsVideoInitialized(true);
    }
  };

  onEnded = () => {
    if (this.videoRef.current?.ended) {
      this.setIsVideoEnded(true);
    }
  };

  onError = (event: any) => {
    console.error('[VideoHandler] Playback error:', event);
    this.setIsVideoError(true);
  };

  onTimeUpdate = () => {
    if (this.videoRef.current) {
      const currentTimeInMinutes = Math.floor(
        this.videoRef.current.currentTime / 60,
      );
      this.setVideoPlayElapsedTimeM(currentTimeInMinutes);
    }
    // For MP4, use timeupdate to hide buffering since seeked/playing
    // events may not fire reliably
    this.setShowBuffering(false);
  };

  onWaiting = () => {
    this.setShowBuffering(true);
  };

  onSeeking = () => {
    this.setShowBuffering(true);
  };

  onSeeked = () => {
    this.setShowBuffering(false);
  };

  onPlaying = () => {
    this.setShowBuffering(false);
  };

  // Event listener management
  setupEventListeners = () => {
    this.videoRef.current?.addEventListener('loadedmetadata', this.onLoadedMetaData);
    this.videoRef.current?.addEventListener('timeupdate', this.onTimeUpdate);
    this.videoRef.current?.addEventListener('ended', this.onEnded);
    this.videoRef.current?.addEventListener('error', this.onError);
    this.videoRef.current?.addEventListener('waiting', this.onWaiting);
    this.videoRef.current?.addEventListener('seeking', this.onSeeking);
    this.videoRef.current?.addEventListener('seeked', this.onSeeked);
    this.videoRef.current?.addEventListener('playing', this.onPlaying);
  };

  removeEventListeners = () => {
    this.videoRef.current?.removeEventListener('loadedmetadata', this.onLoadedMetaData);
    this.videoRef.current?.removeEventListener('timeupdate', this.onTimeUpdate);
    this.videoRef.current?.removeEventListener('ended', this.onEnded);
    this.videoRef.current?.removeEventListener('error', this.onError);
    this.videoRef.current?.removeEventListener('waiting', this.onWaiting);
    this.videoRef.current?.removeEventListener('seeking', this.onSeeking);
    this.videoRef.current?.removeEventListener('seeked', this.onSeeked);
    this.videoRef.current?.removeEventListener('playing', this.onPlaying);
  };

  // Cleanup
  destroyMediaPlayerSync = (timeout: number = 1500): boolean => {
    try {
      if (this.videoRef.current) {
        this.videoRef.current.pause();
      }

      this.removeEventListeners();

      if (this.videoRef.current) {
        const result: MediaPlayerDeInitStatus =
          this.videoRef.current.deinitializeSync(timeout);

        if (result !== 'success') {
          console.error(`[VideoHandler] deinitializeSync failed - ${result}`);
          return false;
        }

        this.videoRef.current = null;
      }

      return true;
    } catch (err) {
      console.error('[VideoHandler] Error during destruction: ', err);
      return false;
    }
  };

  destroyVideoElements = (): boolean => {
    if (!this.videoRef.current) {
      return false;
    }
    return this.destroyMediaPlayerSync();
  };
}
