
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export interface IProps {
  pressFunction: Function;
  buttonText: String;
}

const Button = ({pressFunction, buttonText}: IProps) => {
  const [focus, setFocused] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.buttonContainer, focus && styles.focused]}
        onPress={() => pressFunction()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FF9900',
    padding: 10,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focused: {
    borderWidth: 3,
    borderColor: 'yellow',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default Button;

