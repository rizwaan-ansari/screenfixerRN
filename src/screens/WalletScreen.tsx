import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Txt from '../components/Txt'
import BalanceTab from '../components/BalanceTab'
import COLOR_PALLETE from './../utils/ColorConstant'
import FastImage from 'react-native-fast-image'
import { HISTORY_DEPOSIT_ICON, HISTORY_WITHDRAW_ICON } from '../assets/images'
import HeaderTabBar from '../components/HeaderTabBar'
import { SheetManager } from 'react-native-actions-sheet'

const DATA = [
    {
        id: 0,
        message: 'Withdrawal from your account',
        timestamp: '15th Oct 2020 at 20:08',
        credited: false,
        amount: 15000,
    },
    {
        id: 1,
        message: 'Deposited in your wallet',
        timestamp: '15th Oct 2020 at 20:08',
        credited: false,
        amount: 10000,
    },
    {
        id: 2,
        message: 'Deposited in your wallet',
        timestamp: '15th Oct 2020 at 20:08',
        credited: true,
        amount: 5000,
    },
    {
        id: 3,
        message: 'Deposited in your wallet',
        timestamp: '15th Oct 2020 at 20:08',
        credited: false,
        amount: 5000,
    },
    {
        id: 4,
        message: 'Deposited in your wallet',
        timestamp: '15th Oct 2020 at 20:08',
        credited: true,
        amount: 5000,
    },
    {
        id: 5,
        message: 'Deposited in your wallet',
        timestamp: '15th Oct 2020 at 20:08',
        credited: false,
        amount: 5000,
    },
]

type Transaction = {
    id: number;
    message: string;
    timestamp: string;
    credited: boolean;
    amount: number;
};

const renderItem = ({ item }: { item: Transaction }) => {
    return (
        <TouchableOpacity>
            <View className='px-4 py-4 flex-row justify-between'>
                <View className='flex-row'>
                    {item.credited ?
                        <FastImage source={HISTORY_WITHDRAW_ICON} className='w-12 h-12' /> :
                        <FastImage source={HISTORY_DEPOSIT_ICON} className='w-12 h-12' />
                    }
                    <View className='pl-2'>
                        <Txt fontSize={'base'} fontColor={'textDefault'} fontWeight={500} className=''>{item.message}</Txt>
                        <Txt fontSize={'sm'} fontWeight={500} fontColor={'neutral500'} className='pt-1'>{item.timestamp}</Txt>
                    </View>
                </View>
                <Txt fontWeight={700} fontSize={'base'} fontColor={'textDefault'}>₹{item.amount.toString()}</Txt>
            </View>
        </TouchableOpacity>
    );
};
const WalletScreen = () => {
    return (
        <SafeAreaView className='w-full flex-1 bg-brand'>
            <HeaderTabBar />
            <FlatList
                ListHeaderComponent={<WalletScreenHeader />}
                data={DATA}
                ListHeaderComponentStyle={{ backgroundColor: COLOR_PALLETE.NEUTRAL_600 }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ backgroundColor: COLOR_PALLETE.WHITE }}
                renderItem={renderItem}
                style={{ backgroundColor: COLOR_PALLETE.NEUTRAL_600, paddingHorizontal: 20, paddingTop: 20, marginTop: -15 , borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
            />
        </SafeAreaView>
    )
}

const WalletScreenHeader = () => {
    return (
        <View>
            <View className="mb-4">
                <BalanceTab onPressDeposit={() => SheetManager.show('add-balance-drawer')}/>
            </View>
            <View className='bg-white rounded-tr-lg rounded-tl-lg p-4'>
                <Txt fontSize="lg" fontColor={'textDefault'} fontWeight={700} className=''>Payment History</Txt>
            </View>
        </View>
    )
}

export default WalletScreen