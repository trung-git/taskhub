import { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GenderPicker = ({ onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    console.log('gendervalue', value)
    if(value) {
      setSelectedValue(value)
    }
  }, [value])

  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    console.log('option', option);
    setSelectedValue(option);
    setModalVisible(false);
    onChange && onChange(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textInput}
        onPress={() => setModalVisible(true)}>
        <Text>
          {selectedValue == ''
            ? 'Chọn Giới Tính'
            : selectedValue == 'Male'
            ? 'Nam'
            : 'Nữ'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Picker
            style={{ backgroundColor: 'white' }}
            selectedValue={selectedValue?._id}
            onValueChange={(itemValue, itemIndex) => {
              console.log('itemValue', itemValue);
              if (itemValue !== '') {
                handleOptionSelect(itemValue);
                setModalVisible(false);
              } else {
                setModalVisible(false);
              }
            }}>
            <Picker.Item label="Chọn Giới tính" value="" key="" />
            <Picker.Item label={'Nam'} value={'Male'} key={'female'} />
            <Picker.Item label={'Nữ'} value={'Female'} key={'female'} />
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default GenderPicker;
