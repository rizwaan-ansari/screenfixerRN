import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import FastImage, { Source } from 'react-native-fast-image';
import Txt from './Txt';
import Button from './Button';
import { ContextData } from '../providers/ContextProvider';
import { SvgSquircle } from '../assets/images';

interface CustomerInfoProps {
    name: string;
    profilePicture: Source | undefined;
    address: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ name, address, profilePicture }) => {
  const {contextData, setContextData} = useContext(ContextData);

  const item: any = contextData.repairRequestItem;
  return (
    <View className='p-4 bg-white mx-4 mt-4 rounded-[10px]'>
      <View className='flex-row gap-x-[15px] items-center'>
        <View className='w-[38px] h-[38px] relative flex-row justify-center items-center'>
          <SvgSquircle />
          <View className='absolute z-10'>
            <Txt fontColor={"brandLight"} fontSize={"lg"} fontWeight={700}>{`${item?.customer_name.charAt(0)}`}</Txt>
          </View>
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
            <Button borderRadius={5} icon={"call"} variant={"call"} size={"base"} label={"Call Customer"} paddingVertical={18} paddingHorizontal={110} />
        </View>
    </View>
  )
}

export default CustomerInfo