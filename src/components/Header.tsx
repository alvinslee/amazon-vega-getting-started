
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Welcome to Vega!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#232F3E',
    width: '100%',
  },
  headerText: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FF9900',
  },
});

export default Header;

