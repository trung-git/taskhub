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
import SubAddressPicker from './SubAddressPicker';

const WorkLocationSelect = ({ value, onChange }) => {
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const selectedCity = value?.[0]?.city;

  console.log('locations', locations);

  useEffect(() => {
    if (value) {
      setLocations(value);
    }
  }, [value]);

  //   <SubAddressPicker
  //                         value={signUpData?.workLocation}
  //                         cityId={signUpData?.city?._id}
  //                         onChange={(districtId) =>
  //                           handleSignUpForm('workLocation', districtId)
  //                         }
  //                       />

  const handleAddLoc = () => {
    const newLoc = {
      _id: '',
      city: {
        _id: '64a12b2fde768d62c2605820',
        name: 'Hồ Chí Minh',
        prefix: 'th_key_city',
      },
      name: '1',
      prefix: 'th_key_district_type1',
    };
    setLocations((prev) => [...prev, newLoc]);
  };

  const onLocChange = (index, value) => {
    const newLocs = [...locations];
    newLocs[index] = value;
    setLocations(newLocs);
    onChange && onChange(newLocs);
  };

  const onLocDelete = (index) => {
    const newLocs = [...locations];
    newLocs.splice(index, 1);
    setLocations(newLocs);
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
            Thành phố hiện tại:{' '}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 9,
            }}
          >
            {selectedCity?.name}
          </Text>
        </View>
        {locations?.map((loc, index) => {
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
              {/* <View style={{ width: '25%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginRight: 8,
                    textAlign: 'center',
                    color: 'black',
                  }}
                >
                  Khu vực {index + 1}:
                </Text>
              </View> */}
              <View style={{ width: '80%' }}>
                <SubAddressPicker
                  value={loc}
                  cityId={selectedCity?._id}
                  onChange={(districtId) => onLocChange(index, districtId)}
                  excludeIds={locations?.map((_loc) => _loc?._id)}
                />
              </View>
              <TouchableOpacity
                onPress={() => onLocDelete(index)}
                disabled={index == 0}
              >
                <Ionicons
                  name="trash-outline"
                  size={32}
                  color={index == 0 ? 'gray' : 'red'}
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
            title="Thêm địa chỉ làm việc"
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
});

export default WorkLocationSelect;
