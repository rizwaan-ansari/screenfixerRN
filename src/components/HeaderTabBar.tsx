import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { BRAND_LOGO, SvgNotification } from '../assets/images'

const HeaderTabBar = () => {
  return (
    <View className='bg-brand px-3 pb-8 flex-row justify-between'>
      <FastImage source={BRAND_LOGO} className='w-[83px] h-[33px]' />
      <TouchableOpacity className='relative'>
        <SvgNotification />
        <View className='w-[6px] h-[6px] absolute bg-candyPink rounded right-0'></View>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderTabBar