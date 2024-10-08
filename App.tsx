import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SheetProvider } from 'react-native-actions-sheet';
import { PaperProvider } from 'react-native-paper';

import BottomTabBar, { TabParamList } from "./src/components/BottomTabBar";
import './src/components/Drawers/sheets.tsx';
import DataContextProvider from "./src/providers/ContextProvider.tsx";
import RequestDetailsScreen from "./src/screens/RequestDetailsScreen.tsx";
import FindLeadsScreen from "./src/screens/FindLeadsScreen";
import LogInScreen from "./src/screens/LogInScreen.tsx";
import ProfileScreen from "./src/screens/ProfileScreen";
import RequestsScreen from "./src/screens/RequestsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import NotificationScreen from "./src/screens/NotificationScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './src/providers/queryClient.tsx';

const Tab = createBottomTabNavigator<TabParamList>();
const RequestStack = createNativeStackNavigator();
const LeadsStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function NavigationTabs(): React.JSX.Element {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props: any) => <BottomTabBar {...props} />}>
            <Tab.Screen initialParams={{ iconName: 'calender' }} name="Requests" component={RequestStackNavigator} />
            <Tab.Screen initialParams={{ iconName: 'search' }} name="Find Leads" component={LeadsStackNavigator} />
            <Tab.Screen initialParams={{ iconName: 'wallet' }} name="Wallet" component={WalletStackNavigator} />
            <Tab.Screen initialParams={{ iconName: 'profile' }} name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
}

const RootStactNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {/* <RootStack.Screen name="LogInScreen" component={LogInScreen} /> */}
            <RootStack.Screen name="NavigationTabs" component={NavigationTabs} />
            <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
        </RootStack.Navigator>
    )
}

const RequestStackNavigator = () => {
    return (
        <RequestStack.Navigator screenOptions={{ headerShown: false }}>
            <RequestStack.Screen name="RequestScreen" component={RequestsScreen} />
            <RequestStack.Screen name="RequestDetailsScreen" component={RequestDetailsScreen} />
        </RequestStack.Navigator>
    )
}

const LeadsStackNavigator = () => {
    return (
        <LeadsStack.Navigator screenOptions={{ headerShown: false }}>
            <LeadsStack.Screen name="FindLeadsScreen" component={FindLeadsScreen} />
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
        <QueryClientProvider client={queryClient}>
            <DataContextProvider>
                <SheetProvider>
                    <PaperProvider>
                        <NavigationContainer>
                            <RootStactNavigator />
                        </NavigationContainer>
                    </PaperProvider>
                </SheetProvider>
            </DataContextProvider>
        </QueryClientProvider>
    );
}

export default App;
