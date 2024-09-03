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
        <View className='p-4 flex-row'>
            <View className='w-[90px] h-[100px] flex items-center justify-center bg-white20'>
                <FastImage source={payload.image} className='w-[68px] h-[82px]' resizeMode='contain'/>
            </View>
            <View>
                <Txt>{payload.deviceName}</Txt>
            </View>
        </View>
    </ActionSheet>
  )
}

export default PurchaseLeadDrawer