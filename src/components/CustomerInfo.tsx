import { View, Text } from 'react-native'
import React from 'react'
import FastImage, { Source } from 'react-native-fast-image';
import Txt from './Txt';
import Button from './Button';

interface CustomerInfoProps {
    name: string;
    profilePicture: Source | undefined;
    address: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ name, address, profilePicture }) => {
  return (
    <View className='p-4 bg-white mx-4 mt-4 rounded-[10px]'>
      <View className='flex-row gap-x-[15px] items-center'>
        <View className='w-[38px] h-[38px]'>
            <FastImage 
                source={profilePicture}
                className='w-full h-full'
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
        <View className='w-full'>
            <Txt fontSize={"sm"} fontColor={'neutral300'} fontWeight={400}>Customer Name</Txt>
            <Txt fontSize={"base"} fontWeight={500} fontColor={'black'} className='pt-2'>{name}</Txt>
        </View>
      </View>
        <View className='w-[292px] ml-auto px-4 mt-5'>
        <View style={{height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)'}}></View>
            <Txt className='mt-5' fontSize={'sm'} fontWeight={400} fontColor={"neutral300"}>Address</Txt>
            <Txt className='pt-2' fontSize={"base"} fontWeight={400} fontColor={'black'}>{address}</Txt>
        </View>
        <View className='mt-5'>
            <Button icon={"call"} variant={"call"} size={"base"} label={"Call Customer"} paddingVertical={18} paddingHorizontal={110} />
        </View>
    </View>
  )
}

export default CustomerInfo