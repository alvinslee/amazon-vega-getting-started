import React, { Ref, useState } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface FocusableElementProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onFocusOverrideStyle: StyleProp<ViewStyle>;
  onPress?: () => void;
  hasTVPreferredFocus?: boolean;
  focusableElementRef?: Ref<TouchableOpacity>;
  style: StyleProp<ViewStyle>;
}

const FocusableElement = ({
  focusableElementRef,
  children,
  onPress,
  onBlur,
  onFocus,
  onFocusOverrideStyle,
  style,
  hasTVPreferredFocus,
  ...otherProps
}: FocusableElementProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const focusHandler = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const blurHandler = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <TouchableOpacity
      ref={focusableElementRef}
      activeOpacity={1}
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={focusHandler}
      onBlur={blurHandler}
      onPress={onPress}
      style={[style, isFocused ? onFocusOverrideStyle : undefined]}
      testID={otherProps.testID}
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(FocusableElement);
