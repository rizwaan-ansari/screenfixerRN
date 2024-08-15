import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import Txt from '../components/Txt'
import FastImage from 'react-native-fast-image'
import { WITHDRAW_ICON } from '../assets/images/index'
import { DEPOSIT_ICON } from '../assets/images/index';
import BalanceTab  from '../components/BalanceTab'
import COLOR_PALLETE from './../utils/ColorConstant'

const renderItem = (({ item }: {item: any}) => {
    return (
        <Txt numberOfLines={1}>{item?.name}</Txt>
    );
});

const WalletScreen = () => {
    return (
        <SafeAreaView className='w-full flex-1 bg-slate-500'>

            <FlatList 
                ListHeaderComponent={<WalletScreenHeader />}
                data={[
                    {
                        name: "dsdasd",
                        payment: "dasdas",
                    },
                    {
                        name: "dsdasd",
                        payment: "dasdas",
                    },
                ]}
                ListHeaderComponentStyle={{backgroundColor: COLOR_PALLETE.NEUTRAL_600}}
                contentContainerStyle={{backgroundColor: COLOR_PALLETE.WHITE}}
                renderItem={renderItem}
                style={{backgroundColor: COLOR_PALLETE.NEUTRAL_600, paddingHorizontal: 20, paddingTop: 20, borderTopRightRadius: 12, borderTopLeftRadius: 12}}
            />
        </SafeAreaView>
    )
}

const WalletScreenHeader = () => {
    return (
        <View>
            <View className="mb-4">
                <BalanceTab />
            </View>
            <View className='bg-white rounded-tr-lg rounded-tl-lg p-4'>
                <Txt fontSize="lg" className=''>Payment History</Txt>
            </View>
        </View>
    )
}

export default WalletScreen