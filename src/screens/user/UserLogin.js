import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { firebase } from '../../../config'; // Import 'firebase' from your 'config.js'
import Loader from "../common/Loader";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const adminLogin = async () => {
    setModalVisible(true); // Show the loader

    try {
      const querySnapshot = await firebase.firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();

        if (user.email === email && user.password === password) {
          // Password matches, navigate to the next screen
          goToNextScreen();
        } else {
          alert('Please Check Email/Password');
        }
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again.');
    } finally {
      setModalVisible(false); // Hide the loader, regardless of the outcome
    }
  };

  const goToNextScreen = async () => {
    await AsyncStorage.setItem('EMAIL', email);
    
    // await AsyncStorage.setItem('USERID', userId);
    // await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== "" && password !== "") {
            adminLogin();
          } else {
            alert("Please enter email and password");
          }
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('UserSignup');
        }}
      >
        Create a New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginBottom: 20,
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    width: "90%",
  },
  loginBtn: {
    backgroundColor: "orange",
    width: "90%",
    height: 50,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 18,
  },
  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
  },
});
