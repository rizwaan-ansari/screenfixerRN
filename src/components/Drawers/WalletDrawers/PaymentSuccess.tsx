import React from 'react';
import { View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';

import { PAYMENT_SUCCESS_IMG } from '../../../assets/images';
import Button from '../../Button';
import Txt from '../../Txt';

const handlePress = async () => {
    await SheetManager.hide("payment-success-drawer");
}

const PaymentSuccess = () => {
  return (
    <ActionSheet>
    <View className='items-center'>
      <FastImage source={PAYMENT_SUCCESS_IMG} className='w-[62px] h-[50px] mt-5'/>
      <Txt fontWeight={700} fontColor={'textDefault'} fontSize={'xl'} className='mt-[22px]'>Payment successful</Txt>
      <Txt fontSize={'base'} textAlign={'center'} fontColor={'neutral400'} className='max-w-[275px] tracking-tighter mt-2'>Your payment for the booking is successful. You can view payment history in wallet anytime</Txt>
      <View className='w-full px-4 mt-3'>
      <Button borderRadius={4} onPress={handlePress} label={"OKAY"} />
      </View>
    </View>
    </ActionSheet>
  )
}

export default PaymentSuccess