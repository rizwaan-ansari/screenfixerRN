import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Txt from '../components/Txt'
import FastImage from 'react-native-fast-image'
import { WITHDRAW_ICON } from '../assets/images/index'
import { DEPOSIT_ICON } from '../assets/images/index';

interface BalanceTabProps {
    onPressDeposit: () => void; 
}

const BalanceTab = ({onPressDeposit}: BalanceTabProps) => {
    return (
        <SafeAreaView className='w-full'>
            <View className='bg-brand rounded-lg flex flex-row items-center justify-between px-[25px]'>
                <View className='py-8'>
                    <Txt fontSize={'4xl'} fontColor={'white700'} fontWeight={700} className=''>₹5000</Txt>
                    <Txt fontSize={'sm'} fontColor={'white60'} fontWeight={400} className='pt-2'>Current balance</Txt>
                </View>
                <View className='flex-row items-center gap-[15px]'>
                    <View className='items-center'>
                        <TouchableOpacity>
                            <FastImage source={WITHDRAW_ICON} className='w-[34px] h-[34px]' />
                            <Txt fontSize={'sm'} fontColor={'white'} className='pt-[8px]' fontWeight={500}>Withdraw</Txt>
                        </TouchableOpacity>
                    </View>
                    <View className='items-center'>
                        <TouchableOpacity onPress={onPressDeposit}>
                            <FastImage source={DEPOSIT_ICON} className='w-[34px] h-[34px]' />
                            <Txt fontSize={'sm'} fontColor={'white'} className='pt-[8px]' fontWeight={500}>Deposit</Txt>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BalanceTab;