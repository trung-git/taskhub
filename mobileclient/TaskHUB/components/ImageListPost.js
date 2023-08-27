import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ImageListPost = ({ images }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImagePress = () => {
    setShowModal(true);
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity onPress={handleImagePress}>
  //     <Image source={{ uri: item }} style={styles.image} />
  //   </TouchableOpacity>
  // );
  const renderItem = ({ item, index }) => {
    if (index === 2 && images.length > 3) {
      return (
        <TouchableOpacity onPress={handleImagePress}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>+{images.length - 3}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={images.slice(0, 3)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      /> */}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {images.slice(0, 3)?.map((item, index) => {
          if (index === 2 && images.length > 3) {
            return (
              <TouchableOpacity onPress={handleImagePress} key={index}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} />
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{images.length - 3}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity onPress={handleImagePress} key={index}>
                <Image source={{ uri: item }} style={styles.image} />
              </TouchableOpacity>
            );
          }
        })}
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Ionicons name={'close-circle-outline'} size={40} color={'red'} />
          </TouchableOpacity>
          <ScrollView
            style={{ marginTop: 150 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={[
                  styles.largeImage,
                  index === images.length - 1 && styles.lastImage,
                ]}
              />
            ))}
          </ScrollView>
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
  // image: {
  //   width: 100,
  //   height: 100,
  //   margin: 5,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 112,
    right: 15,
    // backgroundColor: 'white',
    // borderRadius: '50%',
    // padding: 10,
    // width: 40,
    // height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  largeImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 8,
  },
  lastImage: {
    marginBottom: 150,
  },
});

export default ImageListPost;
