import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      //checkLogin();
      navigation.navigate('SelectLogin');
    }, 3000);
  }, []);

  const checkLogin = async () => {
    try {
      const email = await AsyncStorage.getItem('EMAIL');
      console.log(email);
      const userId = await AsyncStorage.getItem('USERID');
      console.log(userId)
      // Check for USERID instead of EMAIL
      if (email !== null) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('SelectLogin');
      }
    } catch (error) {
      console.error('Error checking login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TCE FC-APP</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: 'red'
  }
});
