import { View, Text } from 'react-native'
import React from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import FastImage from 'react-native-fast-image'
import { WITHDRAW_REQUEST_SUCCESS_IMG } from '../../../assets/images'
import Txt from '../../Txt'
import Button from '../../Button'

const handlePress = async () => {
    await SheetManager.hide("withdraw-request-success-drawer");
    await SheetManager.show('withdraw-success-drawer');
}

const WithdrawalRequestSuccessDrawer = () => {
    return (
        <ActionSheet>
            <View className='items-center justify-center'>
                <FastImage source={WITHDRAW_REQUEST_SUCCESS_IMG} className='w-[135px] h-[100px] mt-5' />
                <Txt fontSize={'xl'} fontWeight={700} className='mt-[14px]' fontColor={'textDefault'}>Request successful</Txt>
                <Txt fontColor={'neutral400'} fontSize={'base'} textAlign={'center'} className='max-w-[275px] tracking-tight mt-2'>Withdrawal request has been placed, you will recieve the amount in your account once processed</Txt>
                <View className='w-full px-4 mt-3'>
                    <Button onPress={handlePress} label={"OKAY"} />
                </View>
            </View>
        </ActionSheet>
    )
}

export default WithdrawalRequestSuccessDrawer