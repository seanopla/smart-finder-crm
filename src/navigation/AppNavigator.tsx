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
import { LeadProvider } from "../context/LeadContext";
import LeadListScreen from "../screens/LeadListScreen";
import AddLeadScreen from "../screens/AddLeadScreen";
import PipelineScreen from "../screens/PipelineScreen";
import FollowUpListScreen from "../screens/FollowUpListScreen";
import InputFollowUpScreen from "../screens/InputFollowUpScreen";

import { FollowUpProvider } from "../context/FollowUpContext";
import { RelationProvider } from "../context/RelationContext";
import RelationListScreen from "../screens/RelationListScreen";
import AddRelasiScreen from "../screens/AddRelasiScreen";
import { ActivityProvider } from "../context/ActivityContext";
import ActivityListScreen from "../screens/ActivityListScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import { PenawaranProvider } from "../context/PenawaranContext";
import PenawaranListScreen from "../screens/PenawaranListScreen";
import AddPenawaranScreen from "../screens/AddPenawaranScreen";
import { JourneyProvider } from "../context/JourneyContext";
import JourneyListScreen from "../screens/JourneyListScreen";
import AddJourneyScreen from "../screens/AddJourneyScreen";
import OptimasiRouteScreen from "../screens/OptimasiRouteScreen";
import { VisitProvider } from "../context/VisitContext";
import JadwalVisitScreen from "../screens/JadwalVisitScreen";
import IsiKunjunganScreen from "../screens/IsiKunjunganScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -30,
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
            color: "#ffffff",
            marginTop: 0,
            fontSize: 10,
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
    <LeadProvider>
      <FollowUpProvider>
        <RelationProvider>
          <ActivityProvider>
            <PenawaranProvider>
              <JourneyProvider>
                <VisitProvider>
                  <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Login" component={LoginScreen} />
                      <Stack.Screen
                        name="MainTabs"
                        component={BottomTabNavigator}
                      />

                      <Stack.Screen
                        name="LeadList"
                        component={LeadListScreen}
                        options={{
                          headerShown: true,
                          title: "Lead Baru",
                          headerStyle: {
                            backgroundColor: "#0047D3",
                          },
                          headerTintColor: "#FFF",
                          headerTitleStyle: {
                            fontSize: 16,
                            fontWeight: "bold",
                          },
                          animation: "slide_from_right",
                        }}
                      />
                      <Stack.Screen
                        name="AddLead"
                        component={AddLeadScreen}
                        options={{
                          headerShown: true,
                          title: "Lead Baru",
                          headerStyle: {
                            backgroundColor: "#0047D3",
                          },
                          headerTintColor: "#FFF",
                          headerTitleStyle: {
                            fontSize: 16,
                            fontWeight: "bold",
                          },
                          animation: "slide_from_right",
                        }}
                      />
                      <Stack.Screen
                        name="Pipeline"
                        component={PipelineScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="FollowUpList"
                        component={FollowUpListScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="InputFollowUp"
                        component={InputFollowUpScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="RelationList"
                        component={RelationListScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="AddRelasi"
                        component={AddRelasiScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="ActivityList"
                        component={ActivityListScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="AddActivity"
                        component={AddActivityScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="PenawaranList"
                        component={PenawaranListScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="AddPenawaran"
                        component={AddPenawaranScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="JourneyList"
                        component={JourneyListScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="AddJourney"
                        component={AddJourneyScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="OptimasiRoute"
                        component={OptimasiRouteScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="JadwalVisit"
                        component={JadwalVisitScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                      <Stack.Screen
                        name="IsiKunjungan"
                        component={IsiKunjunganScreen}
                        options={{ animation: "slide_from_right" }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </VisitProvider>
              </JourneyProvider>
            </PenawaranProvider>
          </ActivityProvider>
        </RelationProvider>
      </FollowUpProvider>
    </LeadProvider>
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
