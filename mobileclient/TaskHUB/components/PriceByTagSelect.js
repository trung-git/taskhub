import { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import TaskTagPicker from './TaskTagPicker';

const PriceByTagSelect = ({ value, onChange }) => {
  const [priceByTag, setPriceByTag] = useState([]);
  const { t } = useTranslation();

  console.log('PriceByTag', priceByTag);

  useEffect(() => {
    if (value) {
      setPriceByTag(value);
    }
  }, [value]);

  //   <TaskTagPicker
  //                         value={signUpData?.workLocation}
  //                         cityId={signUpData?.city?._id}
  //                         onChange={(districtId) =>
  //                           handleSignUpForm('workLocation', districtId)
  //                         }
  //                       />

  const handleAddLoc = () => {
    const newLoc = {
      taskInfo: {},
      price: 0,
    };
    setPriceByTag((prev) => [...prev, newLoc]);
  };

  const onLocChange = (index, key, value) => {
    const newLocs = [...priceByTag];
    newLocs[index][key] = value;
    if (key === 'taskInfo') {
      newLocs[index].price = value?.defaultPrice;
    }
    setPriceByTag(newLocs);
    onChange && onChange(newLocs);
  };

  const onLocDelete = (index) => {
    const newLocs = [...priceByTag];
    newLocs.splice(index, 1);
    setPriceByTag(newLocs);
    onChange && onChange(newLocs);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: 100,
            //   backgroundColor: 'red',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 9,
              fontWeight: 'bold',
            }}
          >
            Danh sách các công việc đã đăng ký
          </Text>
        </View>
        {priceByTag?.map((tag, index) => {
          return (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                paddingVertical: 8,
              }}
              key={index}
            >
              <View style={{ width: '35%' }}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={
                    tag?.price.toString() ||
                    tag?.taskInfo?.defaultPrice.toString()
                  }
                  onChangeText={(text) => onLocChange(index, 'price', text)}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 9,
                  fontWeight: 'bold',
                }}
              >
                /giờ
              </Text>
              <View style={{ width: '40%' }}>
                <TaskTagPicker
                  value={tag?.taskInfo}
                  onChange={(_tag) => onLocChange(index, 'taskInfo', _tag)}
                />
              </View>
              <TouchableOpacity
                onPress={() => onLocDelete(index)}
                // disabled={index == 0}
                disabled={priceByTag?.length === 1}
              >
                <Ionicons
                  name="trash-outline"
                  size={32}
                  color={priceByTag?.length === 1 ? 'gray' : 'red'}
                />
              </TouchableOpacity>
            </View>
          );
        })}
        <View>
          <Button
            style={{
              backgroundColor: 'green',
              width: '90%',
            }}
            title="Thêm công việc khác"
            onPress={() => handleAddLoc()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default PriceByTagSelect;
