import React from 'react';
import { View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

import { SvgSuccess } from '../../../assets/images';
import Button from '../../Button';
import Txt from '../../Txt';

const handlePress = () => {
    SheetManager.hide('lead-purchase-success-drawer');
}

const LeadPurchaseSuccessDrawer = () => {
  return (
    <ActionSheet>
        <View className='px-4 pt-10 flex items-center'>
            {/* <FastImage source={SUCCESS_ICON} className='w-[33px] h-[36px]' /> */}
                <SvgSuccess />
                <Txt className='pt-5 pb-6' fontSize={'xl'} fontColor={'textDefault'} fontWeight={700}>Purchase Successful</Txt>
        </View>
        <View className='px-4'>
        <Button size='sm' label={'VIEW REPAIR REQUESTS'} onPress={handlePress} />
        </View>
    </ActionSheet>
  )
}

export default LeadPurchaseSuccessDrawer