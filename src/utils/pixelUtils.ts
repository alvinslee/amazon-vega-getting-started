import { Dimensions, PixelRatio } from 'react-native';

export const SCREEN_DP = Dimensions.get('window');

const REFERENCE_HEIGHT = 1080;
const SCALE_RATIO = SCREEN_DP.height / REFERENCE_HEIGHT;

export const scaleUxToDp = (uxUnit: number): number =>
  PixelRatio.roundToNearestPixel(uxUnit * SCALE_RATIO);
