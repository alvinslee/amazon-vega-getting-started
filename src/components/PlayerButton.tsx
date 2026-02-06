import React, { RefObject } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../styles/Colors';
import { scaleUxToDp } from '../utils/pixelUtils';
import FocusableElement from './FocusableElement';

// Map icon names to Unicode symbols for TV display
const ICON_MAP: Record<string, string> = {
  'play-arrow': '\u25B6',     // ▶
  'pause': '\u23F8',          // ⏸
  'replay-10': '\u23EA',      // ⏪
  'forward-10': '\u23E9',     // ⏩
};

export interface PlayerButtonProps {
  onPress: () => void;
  icon: string;
  size: number;
  overrideStyle?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  testID?: string;
  hasTVPreferredFocus?: boolean;
}

export const PlayerButton = React.forwardRef(
  (
    {
      onPress,
      icon,
      size,
      overrideStyle,
      onBlur,
      testID,
      hasTVPreferredFocus,
    }: PlayerButtonProps,
    ref: React.ForwardedRef<TouchableOpacity>,
  ) => {
    return (
      <FocusableElement
        onBlur={onBlur}
        focusableElementRef={ref as RefObject<TouchableOpacity> | null}
        style={[styles.buttonContainer, overrideStyle]}
        onFocusOverrideStyle={[styles.buttonFocus, { borderRadius: size }]}
        onPress={onPress}
        hasTVPreferredFocus={hasTVPreferredFocus}
        testID={testID}>
        <Text style={[styles.iconText, { fontSize: size * 0.6 }]}>
          {ICON_MAP[icon] || icon}
        </Text>
      </FocusableElement>
    );
  },
);

const styles = StyleSheet.create({
  buttonContainer: {
    padding: scaleUxToDp(25),
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonFocus: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconText: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export default PlayerButton;
