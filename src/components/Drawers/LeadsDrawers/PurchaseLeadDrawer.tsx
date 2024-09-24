import React from 'react';
import { View } from 'react-native';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';

import Button from '../../Button';
import Txt from '../../Txt';
import { Lead } from '../../../screens/FindLeadsScreen';

const handlePress = async () => {
  await SheetManager.hide('purchase-lead-drawer');
  await SheetManager.show('lead-purchase-success-drawer');
}

const PurchaseLeadDrawer = ({ payload }: {payload: Lead}) => {

    const issuesText = payload.issues.map(issue => issue.label).join(', ');

  return (
    <ActionSheet>
      <View className='p-4'>
        <View className='flex-row pb-3 border-b border-black-10'>
            <View className='w-[90px] h-[100px] flex items-center justify-center bg-white20 rounded-[4px]'>
                <FastImage source={payload.image} className='w-[68px] h-[82px]' resizeMode='contain'/>
            </View>
            <View className='pl-3'>
                <Txt fontWeight={700} fontSize={'lg'} fontColor={'textDefault'}>{payload.deviceName}</Txt>
                <View className='flex-row'>
                  <Txt fontSize={'base'} fontColor={'neutral300'}>
                    {issuesText} issue
                  </Txt>
                </View>
                <Txt fontWeight={500} fontSize={'sm'} fontColor={'neutral500'} className='pt-6'>{payload.timeStamp}</Txt>
            </View>
        </View>
        <View className='flex-row justify-between items-center pt-6 pb-[18px]'>
          <Txt fontSize={'base'} fontWeight={400} fontColor={'neutral300'}>Purchase Lead at</Txt>
          <Txt fontWeight={700} fontSize={'2xl'} fontColor={'textGreen'}>₹{payload.leadPrice}</Txt>
        </View>
          <Button label={"CONFIRM"} onPress={handlePress} />
      </View>
    </ActionSheet>
  )
}

export default PurchaseLeadDrawer