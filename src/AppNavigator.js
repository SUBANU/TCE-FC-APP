import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/Dashboard";
import SelectLogin from "./screens/user/SelectLogin";
import UserLogin from "./screens/user/UserLogin";
import UserSignup from "./screens/user/UserSignup";
//import UserHomePage from "./screens/user/UserHomePage";
import Home from "./screens/user/Home";
import Cart from "./screens/user/Cart";
import EditItems from "./screens/EditItems";



const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{ headerShown: false }}
        />
           <Stack.Screen
          component={SelectLogin}
          name="SelectLogin"
          options={{ headerShown: false }}
        />
            <Stack.Screen
          component={UserLogin}
          name="UserLogin"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={UserSignup}
          name="UserSignup"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          component={UserHomePage}
          name="UserHomePage"
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Cart}
          name="Cart"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditItems}
          name="EditItems"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
