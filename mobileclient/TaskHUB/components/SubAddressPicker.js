import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '../config/constans';

const SubAddressPicker = ({ cityId, onChange, value, excludeIds }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    console.log('cityIdChange', cityId);
    if (cityId && cityId != '') {
      setLoading(true);
      fetchDistricData(cityId);
    }
  }, [cityId]);

  const fetchDistricData = (cityId) => {
    console.log('cityIdChangefetchDistricData', cityId);

    axios
      .get(`${API_URL}/api/v1/area/districts-by-city/${cityId}`)
      .then((response) => {
        const responseData = response.data.data;
        setDistrict(responseData);
        // setSelectedValue(responseData[0]);
        setLoading(false);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        console.error('Error:', Object.keys(error), error.message);
        setLoading(false);
      });
  };

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue._id);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() =>
              district.length > 0 ? setModalVisible(true) : () => {}
            }
          >
            <Text>
              {district.length > 0 && selectedValue?.name
                ? selectedValue?.prefix == 'th_key_district_type1'
                  ? `Quận ${selectedValue.name}`
                  : `Huyện ${selectedValue.name}`
                : 'Chọn Quận/ Huyện'}
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
                    const newItem = district.find(
                      (_item) => _item?._id === itemValue
                    );
                    setSelectedValue(newItem);
                    setModalVisible(false);
                    onChange && onChange(newItem);
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                <Picker.Item label="Chọn Quận/ Huyện" value="" key="" />
                {district.length > 0 &&
                  district.map((item) => {
                    return (
                      <Picker.Item
                        label={
                          item?.prefix == 'th_key_district_type1'
                            ? `Quận ${item.name}`
                            : `Huyện ${item.name}`
                        }
                        value={item._id}
                        key={item._id}
                        enabled={excludeIds?.includes(item._id)}
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

export default SubAddressPicker;
