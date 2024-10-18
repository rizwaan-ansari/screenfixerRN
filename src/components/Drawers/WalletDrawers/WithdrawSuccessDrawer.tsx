import { View } from 'react-native'
import React from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import FastImage from 'react-native-fast-image'
import { WITHDRAW_SUCCESS_IMG } from '../../../assets/images'
import Txt from '../../Txt'
import Button from '../../Button'

const handlePress = async () => {
    await SheetManager.hide("withdraw-success-drawer");
    await SheetManager.show("payment-success-drawer");
}

const WithdrawSuccessDrawer = () => {
    return (
        <ActionSheet>
            <View className='items-center'>
                <FastImage source={WITHDRAW_SUCCESS_IMG} className='w-[135px] h-[100px] mt-5' />
                <Txt className='mt-[14px]' fontWeight={700} fontColor={'textDefault'} fontSize={'xl'}>Withdrawal successful</Txt>
                <Txt fontSize={'base'} textAlign={'center'} className='max-w-[275px] mt-2 tracking-tighter' fontColor={'neutral400'}>Withdrawal request has been processed, amount has been transferred in your linked account</Txt>
                <View className='w-full px-4 mt-3'>
                    <Button borderRadius={4} onPress={handlePress} label={"OKAY"} />
                </View>
            </View>
        </ActionSheet>
    )
}

export default WithdrawSuccessDrawer