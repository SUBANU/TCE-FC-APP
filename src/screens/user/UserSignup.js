import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Loader from '../common/Loader';
import { firebase } from '../../../config';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const UserSignup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const saveUser = async () => {
        setModalVisible(true);

        // Check if the user with this email already exists
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            setModalVisible(false);
            alert('An account with this email already exists.');
            return;
        }

        // Generate a unique userId using uuid.v4()
        const userId = uuid.v4();

        try {
            const usersRef = firebase.firestore().collection('users').doc(userId);

            const userData = {
                name: name,
                email: email,
                password: password,
                mobile: mobile,
                userId: userId,
                cart: [],
            };

            await usersRef.set(userData);
            setModalVisible(false);

            console.log('User data added with ID: ', userId);

            // Store the user's ID in AsyncStorage
            await AsyncStorage.setItem('USERID', userId);

            // Redirect to the main app screen or perform other actions
            navigation.goBack();
        } catch (error) {
            setModalVisible(false);
            console.error('Error adding user data: ', error);
        }
    };

    // Function to check if an account with the given email already exists
    const checkIfEmailExists = async (email) => {
        try {
            const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email);
            return signInMethods.length > 0;
        } catch (error) {
            return false;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Enter Name"
                value={name}
                onChangeText={(txt) => setName(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email Id"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Enter Mobile"
                keyboardType="number-pad"
                value={mobile}
                onChangeText={(txt) => setMobile(txt)}
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
                    if (email !== '' && password !== '' && name !== '' && mobile.length > 9) {
                        saveUser();
                    } else {
                        alert('Please Enter Data');
                    }
                }}
            >
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};

export default UserSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        marginBottom: 20,
    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '90%',
    },
    loginBtn: {
        backgroundColor: 'orange',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 18,
    },
});
