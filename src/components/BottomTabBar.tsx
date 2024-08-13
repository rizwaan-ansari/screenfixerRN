import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';
import COLOR_PALLETE from '../utils/ColorConstant';
import { SvgHome, SvgProfile, SvgWallet, SvgSearch } from '../assets/images';


type Icon = "home" | "search" | "wallet" | "profile"
const ICON_MAPPER: Record<Icon, { icon: React.JSX.Element, activeIcon: React.JSX.Element }> = {
    'home': {
        icon: <SvgHome />,
        activeIcon: <SvgHome stroke={"red"} />,
    },
    'search': {
        icon: <SvgSearch />,
        activeIcon: <SvgSearch />
    },
    'wallet': {
        icon: <SvgWallet />,
        activeIcon: <SvgWallet />
    },
    'profile': {
        icon: <SvgProfile />,
        activeIcon: <SvgProfile />
    },
}; 

type BottomTabParamList = {
    [key: string]: {
      iconName: Icon;
    };
  };
  
  interface BottomBarProps extends BottomTabBarProps {
    state: TabNavigationState<BottomTabParamList & ParamListBase>;
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
            navigation.navigate(route.name);
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
            className='flex-1 flex-row justify-center items-center pt-4 pb-4'
          >
            <View className='flex flex-col items-center'>
                {isFocused ? ICON_MAPPER[iconName]?.activeIcon : ICON_MAPPER[iconName]?.icon}
                <Text className={`text-[12px] pt-[10px] font-normal ${isFocused ? 'text-[#63C7EC]' : 'text-[#FFFFFF]'} bg-red`}>
                    {label as string}
                </Text>
                {/* <View style /> */}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
    <SafeAreaView className="bg-brand"/>
    </>
  );
}

export default BottomTabBar;