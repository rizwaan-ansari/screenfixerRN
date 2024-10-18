import React from 'react';
import { View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';

import { BALANCE_SUCCESS_WALLET_IMG } from '../../../assets/images';
import Button from '../../Button';
import Txt from '../../Txt';

const handlePress = async () => {
    await SheetManager.hide("balance-success-drawer")
}

const BalanceSuccessDrawer = () => {
    return (
        <ActionSheet>
            <View className='items-center'>
                <FastImage source={BALANCE_SUCCESS_WALLET_IMG} className='w-[55px] h-[47px] mt-6' />
                <Txt fontWeight={700} fontColor={'textDefault'} fontSize={'xl'} className='pt-7'>Added Successfully</Txt>
                <Txt fontSize={'base'} className='max-w-[275px] mt-2' fontWeight={400} fontColor={'neutral400'} textAlign={'center'}>Please login or register to continue booking appointment with your doctor</Txt>
                <View className='mt-3 w-full px-4'>
                    <Button borderRadius={4} onPress={handlePress} label={'OKAY'} />
                </View>
            </View>
        </ActionSheet>
    )
}

export default BalanceSuccessDrawer