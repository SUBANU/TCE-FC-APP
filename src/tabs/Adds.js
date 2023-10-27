import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { launchImageLibrary } from "react-native-image-picker";
import {firebase} from '../../config'



const Adds = () => {

  const [imageData, setimageData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === "granted") {
      console.log("Camera permission granted");
      openGallery();
    } else {
      console.log("Camera permission denied");
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
  
    if (result.didCancel) {
      // Handle cancel event
    } else {
      // Generate a unique filename for the image (e.g., using a timestamp)
      const timestamp = new Date().getTime();
      const fileName = "image_" + timestamp + ".jpg";
  
      // Use the result to set the state
      const imageDataWithFileName = { ...result, fileName };
      setimageData(imageDataWithFileName);
  
      // Log the updated state
      console.log(imageDataWithFileName);
    }
  };
  

  const uploadImage = async () => {
    if (imageData) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('images/' + Date.now() + '.jpg');
      
      const response = await fetch(imageData.uri);
      const blob = await response.blob();
  
      try {
        const snapshot = await imageRef.put(blob);
        console.log('Image uploaded successfully.');
  
        // Get the download URL for the uploaded image
        const url = await snapshot.ref.getDownloadURL();
  
        // Call uploadItem with the URL as a parameter
        uploadItem(url);
        console.log(url);
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
    }
  };

  
  const uploadItem = async (url) => {
    firebase
      .firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imageUrl: url,
      })
      .then(() => {
        console.log('item added');
      });
  };
  

  
  return (
    <ScrollView style={styles.container}>
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
        <TextInput placeholder="Enter Item Name" style={styles.inputStyle} value={name} onChangeText={text=>setName(text)}/>
        <TextInput placeholder="Enter Item Price" style={styles.inputStyle} value={price} onChangeText={text=>setPrice(text)}/>
        <TextInput
          placeholder="Enter Item Discount Price"
          style={styles.inputStyle}
          value={discountPrice} onChangeText={text=>setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Enter Item Description"
          style={styles.inputStyle}
          value={description} onChangeText={text=>setDescription(text)}
        />
        <TextInput
          placeholder="Enter Item Image URL"
          style={styles.inputStyle}
          value={imageUrl} onChangeText={text=>setImageUrl(text)}
        />
        <Text style={{ alignSelf: "center", marginTop: 20 }}>OR</Text>
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
          <Text
            style={{ color: "#fff" }}
            onPress={() => {
              uploadImage();
            }}
          >
            Upload Items
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Adds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    elevation: 5,
    paddingLeft: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputStyle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: "center",
  },
  pickBtn: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: "#5246f2",
    width: "90% ",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  imageStyle: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});