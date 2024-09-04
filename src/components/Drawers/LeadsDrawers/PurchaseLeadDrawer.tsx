import { View, Text, Image } from 'react-native'
import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { REDMI_NOTE_6_PRO_IMG } from '../../../assets/images'
import Txt from '../../Txt'
import { Lead } from '../../../screens/FindLeadsScreen'
import FastImage from 'react-native-fast-image'

const PurchaseLeadDrawer = ({ payload }: {payload: Lead}) => {
  return (
    <ActionSheet>
      <View>
        <View className='p-4 flex-row'>
            <View className='w-[90px] h-[100px] flex items-center justify-center bg-white20'>
                <FastImage source={payload.image} className='w-[68px] h-[82px]' resizeMode='contain'/>
            </View>
            <View className='pl-3'>
                <Txt fontWeight={700} fontSize={'lg'} fontColor={'textDefault'}>{payload.deviceName}</Txt>
                <Txt fontWeight={500} fontSize={'sm'} fontColor={'neutral500'} className='pt-6'>{payload.timeStamp}</Txt>
            </View>
        </View>
      </View>
    </ActionSheet>
  )
}

export default PurchaseLeadDrawer