import React from "react";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FindLeadsScreen from "./src/screens/FindLeadsScreen";
import MyLeadsScreen from "./src/screens/MyLeadsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavigationTabs(): React.JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Find Leads" component={FindLeadsScreen} />
      <Tab.Screen name="My Leads" component={MyLeadsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
