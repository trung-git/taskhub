import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '../config/constans';

const TaskTagPicker = ({ onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Bắt đầu tải dữ liệu
      setLoading(true);

      // Gọi API để lấy danh sách các mục
      const response = await axios.get(`${API_URL}/api/v1/task-tag/`);
      const responseData = response.data.data;
      console.log('responseData', responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue._id);
  };

  // const memoPicker = useMemo(() => {
  //   console.log('data', data);
  //   return (
  //     <Picker
  //       mode="dropdown"
  //       selectedValue={selectedValue}
  //       onValueChange={handleValueChange}>
  //       {data.length > 0 &&
  //         data.map((item) => {
  //           return (
  //             <Picker.Item key={item._id} label={item.name} value={item._id} />
  //           );
  //         })}
  //     </Picker>
  //   );
  // }, [data]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    console.log('option', option);
    setSelectedValue(option);
    setModalVisible(false);
    onChange && onChange(option);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => setModalVisible(true)}
          >
            <Text>
              {(data.length > 0 && selectedValue.title) ?? 'Chọn Công Việc'}
            </Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Picker
                style={{ backgroundColor: 'white' }}
                selectedValue={selectedValue?._id}
                onValueChange={(itemValue, itemIndex) => {
                  console.log('itemValue', itemValue);
                  if (itemValue !== '') {
                    setSelectedValue(
                      data.find((_item) => _item?._id === itemValue)
                    );
                    handleOptionSelect(
                      data.find((_item) => _item?._id === itemValue)
                    );
                    setModalVisible(false);
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                <Picker.Item label="Chọn Công Việc" value="" key="" />
                {data.length > 0 &&
                  data.map((item) => {
                    return (
                      <Picker.Item
                        label={item.title}
                        value={item._id}
                        key={item._id}
                      />
                    );
                  })}
              </Picker>
            </View>
          </Modal>
        </>
      )}
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
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'red',
  },
  optionButton: {
    padding: 10,
  },
  optionButtonText: {
    fontSize: 16,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
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

export default TaskTagPicker;
