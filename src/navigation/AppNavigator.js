import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { InputsProvider } from "../app/context/InputsContext";
import TravelsScreen from "../screens/TravelsScreen";
import SeatsScreen from "../screens/SeatsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import DetailsScreen from "../screens/DetailsScreen";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <InputsProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Travels"
            component={TravelsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Seats"
            component={SeatsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </InputsProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
