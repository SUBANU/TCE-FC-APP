import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { firebase } from '../../config'; // Make sure to import 'firebase' from your 'config.js'
import Dashboard from "./Dashboard";

const Login=({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const adminLogin = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection("admin").get();

      let loginSuccessful = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (email === data.email && password === data.password) {
          loginSuccessful = true;
          console.log("Login successful");
          navigation.navigate('Dashboard')
          // You can perform further actions here, such as navigating to a different screen.
          return; // Exit the loop once a match is found.
        }
      });

      if (!loginSuccessful) {
        alert("Wrong email/pass");
      }
    } catch (error) {
      console.error("Error while attempting to login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={"Enter Email Id"}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={"Enter Password"}
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
    </View>
  );
}

export default Login;

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
});