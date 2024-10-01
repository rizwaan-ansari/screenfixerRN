import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { BRAND_LOGO, SvgNotification } from '../assets/images'
import { NavigationProp, useNavigation } from '@react-navigation/native'


type RootStackParamList = {
  Home: undefined;
  NotificationScreen: undefined;
  // Add other screens here
};

const HeaderTabBar = () => {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate("NotificationScreen")
  }
  return (
    <View className='bg-brand px-3 pb-8 flex-row justify-between'>
      <FastImage source={BRAND_LOGO} className='w-[83px] h-[33px]' />
      <TouchableOpacity className='relative' onPress={handlePress}>
        <SvgNotification />
        <View className='w-[6px] h-[6px] absolute bg-candyPink rounded right-0'></View>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderTabBar