import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Komponen Khusus untuk Tab Tengah (Simulator)
const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -30, // Membuat tombol sedikit naik ke atas
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: "#206DF9", // Warna Biru Utama
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#206DF9",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          // elevation: 10,
          backgroundColor: "#ffffff",
          height: 85,
          paddingBottom: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Onboarding"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Onboarding",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "clipboard" : "clipboard-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Simulator"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Simulator",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="document-text" size={30} color="#FFF" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabelStyle: {
            color: "#ffffff", // Label simulator selalu biru di gambar
            marginTop: 0,
            fontSize: 10,
            // fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Laporan"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Laporan",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
});
