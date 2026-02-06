import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../styles/Colors';

interface BufferingWindowProps {
  backgroundColor?: string;
}

const BufferingWindow = React.memo(
  ({ backgroundColor }: BufferingWindowProps) => {
    return (
      <View
        style={[
          styles.container,
          backgroundColor ? { backgroundColor } : undefined,
        ]}
        testID="buffering-view">
        <ActivityIndicator size="large" color={COLORS.WHITE} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    flex: 1,
    backgroundColor: COLORS.BLACK,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
});

export default BufferingWindow;
