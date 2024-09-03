import React from 'react'
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import FastImage from 'react-native-fast-image'
import HeaderTabBar from '../components/HeaderTabBar'
import REQUEST_LIST from '../data/requests.json'
import { Txt } from '../components'
import COLOR_PALLETE from '../utils/ColorConstant'

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
];

type Request = {
    id: number;
    device_name: string;
};
const renderItem = ({ item }: { item: any }) => {
    return (
        <TouchableOpacity className="px-4 py-4 flex-row bg-white rounded-lg">
            <View className='w-[72px] h-20 rounded-[3px] px-2 py-2 mr-4 bg-neutral-550'>
                <FastImage
                    className="w-full h-full"
                    source={{uri: `${item.device.picture.base_url}${item.device.picture.files.file}`}}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            <View className="pt-1">
                <Txt fontWeight={700} fontSize={"sm"} fontColor={'black40'} className="mb-[2]">{item.device_type.name}</Txt>
                <Txt fontWeight={700} fontSize={"xl"} fontColor={'textDefault'}>{item.device.name}</Txt>
            </View>
        </TouchableOpacity>
    );
}
const RequestScreenHeader = () => {
    return (
        <View className='pb-4'>
            <Txt fontSize="2xl" fontColor={'textDefault'} fontWeight={700}>Repair Requests</Txt>
        </View>
    )
}
const RequestsScreen = () => {
    return (
        <>
            <SafeAreaView className='w-full flex-1 bg-brand'>
                <HeaderTabBar />
                <View className='flex-1 px-4 bg-neutral-600 -mt-[15px] rounded-tl-xl rounded-tr-xl pt-[20px]'>
                    <FlatList
                        ListHeaderComponent={<RequestScreenHeader />}
                        data={REQUEST_LIST}
                        ItemSeparatorComponent={() => <View style={{height: 12}} />}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default RequestsScreen