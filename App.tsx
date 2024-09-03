import React from "react";
import type { PropsWithChildren } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SheetProvider } from 'react-native-actions-sheet';
import './src/components/Drawers/sheets.tsx';
import BottomTabBar, { TabParamList, BottomBarProps }  from "./src/components/BottomTabBar";
// import { TabParamList } from "./src/components/BottomTabBar";
import FindLeadsScreen from "./src/screens/FindLeadsScreen";
import MyLeadsScreen from "./src/screens/MyLeadsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RequestsScreen from "./src/screens/RequestsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { PaperProvider } from 'react-native-paper';
import LogInScreen from "./src/screens/LogInScreen.tsx";

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator();
const LeadsStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function NavigationTabs(): React.JSX.Element {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props:any) => <BottomTabBar {...props} />}>
            {/* <Tab.Screen initialParams={{ iconName: 'home' }} name="Find Leads" component={HomeStackNavigator} /> */}
            <Tab.Screen initialParams={{ iconName: 'search' }} name="My Leads" component={LeadsStackNavigator} />
            <Tab.Screen initialParams={{ iconName: 'calender' }} name="Requests" component={RequestsScreen} />
            <Tab.Screen initialParams={{ iconName: 'wallet' }} name="Wallet" component={WalletStackNavigator} />
            <Tab.Screen initialParams={{ iconName: 'profile' }} name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
}

const RootStactNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="LogInScreen" component={LogInScreen} />
            <RootStack.Screen name="NavigationTabs" component={NavigationTabs} />
        </RootStack.Navigator>
    )
}

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        </HomeStack.Navigator>
    )
}

const LeadsStackNavigator = () => {
    return (
        <LeadsStack.Navigator screenOptions={{ headerShown: false }}>
            <LeadsStack.Screen name="LeadsScreen" component={FindLeadsScreen} />
        </LeadsStack.Navigator>
    )
}

const WalletStackNavigator = () => {
    return (
        <WalletStack.Navigator screenOptions={{ headerShown: false }}>
            <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
        </WalletStack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </ProfileStack.Navigator>
    )
}
function App(): React.JSX.Element {
    return (
        <SheetProvider>
            <PaperProvider>
                <NavigationContainer>
                    <RootStactNavigator />
                </NavigationContainer>
            </PaperProvider>
        </SheetProvider>
    );
}

export default App;
