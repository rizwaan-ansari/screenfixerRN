import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { BottomTabBarProps, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { TabNavigationState, ParamListBase, NavigationHelpers } from '@react-navigation/native';
import { SvgHome, SvgProfile, SvgWallet, SvgSearch, SvgHomeActive, SvgProfileActive, SvgWalletActive, SvgSearchActive } from '../assets/images';
import  Txt  from './Txt';
import FastImage from 'react-native-fast-image';
import { BLUR } from './../assets/images/index';


type Icon = "home" | "search" | "wallet" | "profile"
const ICON_MAPPER: Record<Icon, { icon: React.JSX.Element, activeIcon: React.JSX.Element }> = {
    'home': {
        icon: <SvgHome />,
        activeIcon: <SvgHomeActive />,
    },
    'search': {
        icon: <SvgSearch />,
        activeIcon: <SvgSearchActive />
    },
    'wallet': {
        icon: <SvgWallet />,
        activeIcon: <SvgWalletActive />
    },
    'profile': {
        icon: <SvgProfile />,
        activeIcon: <SvgProfileActive />
    },
};

export type TabParamList = {
    'Find Leads': { iconName: Icon };
    'My Leads': { iconName: Icon };
    'Wallet': { iconName: Icon };
    'Profile': { iconName: Icon };
};

export interface BottomBarProps extends Omit<BottomTabBarProps, 'state'> {
    state: TabNavigationState<TabParamList>;
    navigation: NavigationHelpers<TabParamList, BottomTabNavigationEventMap>;
}

  const BottomTabBar: React.FC<BottomBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <>
            <View className='flex-row px-4 bg-brand'>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({
                                name: route.name,
                                params: route.params,
                                merge: true,
                              });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    const iconName = route.params?.iconName as Icon;
                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            className='relative flex-1 flex-row justify-center items-center pt-4 pb-4'
                        >
                            <View className='flex flex-col items-center'>
                                {isFocused ? ICON_MAPPER[iconName]?.activeIcon : ICON_MAPPER[iconName]?.icon}
                                <Txt fontSize={"sm"} fontColor={isFocused ? "brandLight" : "white"} className='pt-[10px]'>
                                    {label as string}
                                </Txt>
                                {isFocused ? <FastImage
                                    source={BLUR}
                                    className='absolute h-12 w-12 -top-4 z-[-1]'
                                /> : ""}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <SafeAreaView className="bg-brand" />
        </>
    );
}

export default BottomTabBar;