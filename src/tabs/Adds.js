import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Permissions,ImagePicker } from 'expo-permissions'; 
import { launchImageLibrary } from 'react-native-image-picker';

const Adds = () => {
  const [imageData, setimageData] = useState(null);

  const requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      console.log('Camera permission granted');
      openGallery();
    } else {
      console.log('Camera permission denied');
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (result.didCancel) {
      // Handle cancel event
    } else {
      console.log(result);
      setimageData(result);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Item</Text>
      </View>
      {imageData !== null ? (
        <Image
          source={{ uri: imageData.assets[0].uri }}
          style={styles.imageStyle}
        />
      ) : null}
      <TextInput placeholder="Enter Item Name" style={styles.inputStyle} />
      <TextInput placeholder="Enter Item Price" style={styles.inputStyle} />
      <TextInput
        placeholder="Enter Item Discount Price"
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="Enter Item Description"
        style={styles.inputStyle}
      />
      <TextInput placeholder="Enter Item Image URL" style={styles.inputStyle} />
      <Text style={{ alignSelf: 'center', marginTop: 20 }}>OR</Text>
      <TouchableOpacity
        style={styles.pickBtn}
        onPress={() => {
          openGallery();
        }}
      >
        <Text>Pick Image From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => {
          requestCameraPermission();
        }}
      >
        <Text style={{ color: '#fff' }}>Upload Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Adds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90% ',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
