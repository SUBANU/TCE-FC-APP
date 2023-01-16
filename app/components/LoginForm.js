
import { StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard
    
} from 'react-native';

import React, {useState} from 'react'
import {firebase } from '../../config'


const LoginForm = () =>
{
    const todoRef = firebase.firestore().collection('newData');
    const [addData, setData] = useState('');

    const addField = () =>{
        if(addData && addData.length > 0)
        {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(()=>{
                    setData('');
                    Keyboard.dismiss();
                })
                .catch((error)=>{
                    alert(error)
                })
        }
    }

    return (
        <View style = {styles.header}>
          
          <TextInput 
                     style = {styles.textInput}
                     placeholder='Your name' 
                     underlineColorAndroid={'transparent'}
                      onChangeText = {(heading)=>setData(heading)}
                      value = {addData}
                      multiline = {true}
                     />
          {/* <TextInput style = {styles.textInput}placeholder='Your email' underlineColorAndroid={'transparent'} secureTextEntry = {true}/> */}
          <TouchableOpacity 
          style = {styles.button}
          onPress = {addField}>
            <Text style = {styles.signup}>SIGNUP</Text>
          </TouchableOpacity>

        </View>
      );
}

  


const styles = StyleSheet.create({
  loginForm: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187'

  },
  textInput:{
    alignSelf: 'stretch',
    height:40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
});

export default LoginForm