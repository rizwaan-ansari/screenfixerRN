import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SheetProvider } from 'react-native-actions-sheet';
import BottomTabBar, { TabParamList } from "./src/components/BottomTabBar";
import './src/components/Drawers/sheets.tsx';
import { PaperProvider } from 'react-native-paper';
import DetailsScreen from "./src/screens/RequestDetailsScreen.tsx";
import FindLeadsScreen from "./src/screens/FindLeadsScreen";
import LogInScreen from "./src/screens/LogInScreen.tsx";
import ProfileScreen from "./src/screens/ProfileScreen";
import RequestsScreen from "./src/screens/RequestsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import DataContextProvider from "./src/providers/ContextProvider.tsx";

const Tab = createBottomTabNavigator<TabParamList>();
const RequestStack = createNativeStackNavigator();
const LeadsStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function NavigationTabs(): React.JSX.Element {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props:any) => <BottomTabBar {...props} />}>
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
        </RootStack.Navigator>
    )
}

const RequestStackNavigator = () => {
    return (
        <RequestStack.Navigator screenOptions={{ headerShown: false }}>
            <RequestStack.Screen name="RequestScreen" component={RequestsScreen} />
            <RequestStack.Screen name="DetailsScreen" component={DetailsScreen} />
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
        <SheetProvider>
            <PaperProvider>
                <DataContextProvider>
                    <NavigationContainer>
                        <RootStactNavigator />
                    </NavigationContainer>
                </DataContextProvider>
            </PaperProvider>
        </SheetProvider>
    );
}

export default App;
