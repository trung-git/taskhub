import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Keyboard,
  ActivityIndicator,
  Button,
} from 'react-native';

const TextUpdate = ({ value, onChange }) => {
  return (
    <View style={{}}>
      <TextInput
        style={styles.textInput}
        placeholder="username"
        placeholderTextColor="gray"
        value={value}
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
};

export default TextUpdate;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: 8,
  },
});
