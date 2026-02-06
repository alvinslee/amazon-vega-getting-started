import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../styles/Colors';
import { scaleUxToDp } from '../utils/pixelUtils';
import FocusableElement from './FocusableElement';

interface BackButtonProps {
  onPress: () => void;
  hasTVPreferredFocus?: boolean;
}

const BackButton = ({ onPress, hasTVPreferredFocus = false }: BackButtonProps) => {
  return (
    <FocusableElement
      hasTVPreferredFocus={hasTVPreferredFocus}
      style={styles.container}
      onFocusOverrideStyle={styles.focused}
      onPress={onPress}
      testID="header_back_icon">
      <Text style={styles.icon}>{'\u2039'}</Text>
    </FocusableElement>
  );
};

export default React.memo(BackButton);

const styles = StyleSheet.create({
  container: {
    padding: scaleUxToDp(25),
    alignItems: 'center',
    flexDirection: 'row',
    width: scaleUxToDp(125),
  },
  focused: {
    backgroundColor: COLORS.DARK_GRAY,
    borderRadius: scaleUxToDp(70),
  },
  icon: {
    color: COLORS.WHITE,
    fontSize: scaleUxToDp(70),
    fontWeight: '300',
  },
});
