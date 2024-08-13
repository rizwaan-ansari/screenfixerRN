import React from "react";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "./src/components/BottomTabBar";
import FindLeadsScreen from "./src/screens/FindLeadsScreen";
import MyLeadsScreen from "./src/screens/MyLeadsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Entypo from "react-native-vector-icons/Entypo"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function NavigationTabs(): React.JSX.Element {
  return (
    <Tab.Navigator  tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen initialParams={{ iconName: 'home' }} name="Find Leads" component={FindLeadsScreen} />
      <Tab.Screen initialParams={{ iconName: 'search' }} name="My Leads" component={MyLeadsScreen} />
      <Tab.Screen initialParams={{ iconName: 'wallet' }} name="Wallet" component={WalletScreen} />
      <Tab.Screen initialParams={{ iconName: 'profile' }} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
}

export default App;
