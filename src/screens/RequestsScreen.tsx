import React from 'react'
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import HeaderTabBar from '../components/HeaderTabBar'
import REQUEST_LIST from '../data/requests.json'
import { Txt } from '../components'
import COLOR_PALLETE from '../utils/ColorConstant'
import { GALAXY_ZFOLD_IMG, ONE_PLUS_10T_IMG, REDMI_NOTE_6_PRO_IMG, SvgCall } from '../assets/images'
import Button from '../components/Button'

const DATA = [
    {
        id: 1,
        image: REDMI_NOTE_6_PRO_IMG,
        deviceType: "Mobile Phone",
        deviceName: "Redmi Note 6 Pro",
        issues: [
            {
                type: "screen_replacement",
                label: "Screen Replacement"
            },
            {
                type: "speaker",
                label: "Speaker"
            }
        ], 
        status: "Work-in-progress",
        requestId: "SF999",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
    {
        id: 2,
        image: ONE_PLUS_10T_IMG,
        deviceType: "Mobile Phone",
        deviceName: "OnePlus 10T 56",
        issues: [
            {
                type: "screen_replacement",
                label: "Screen Replacement"
            },
            {
                type: "speaker",
                label: "Speaker"
            }
        ], 
        status: "Assigned",
        requestId: "SF999",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
    {
        id: 3,
        image: GALAXY_ZFOLD_IMG,
        deviceType: "Mobile Phone",
        deviceName: "Galaxy Z Fold3 5G",
        issues: [
            {
                type: "screen_replacement",
                label: "Screen Replacement"
            },
            {
                type: "speaker",
                label: "Speaker"
            }
        ], 
        status: "Work-in-progress",
        requestId: "SF999",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    }
];

interface Issues {
    type: string,
    label: string
}

export type Request = {
    id: number,
    image: FastImageProps['source'],
    deviceType: string,
    deviceName: string,
    repairValue: string,
    leadPrice: string,
    issues: Issues[],
    status: string,
    requestId: string,
    timeStamp: string
}
// const renderItem = ({ item }: { item: any }) => {
//     return (
//         <TouchableOpacity className="px-4 py-4 flex-row bg-white rounded-lg">
//             <View className='w-[72px] h-20 rounded-[3px] px-2 py-2 mr-4 bg-neutral-550'>
//                 <FastImage
//                     className="w-full h-full"
//                     source={{uri: `${item.device.picture.base_url}${item.device.picture.files.file}`}}
//                     resizeMode={FastImage.resizeMode.contain}
//                 />
//             </View>
//             <View className="pt-1">
//                 <Txt fontWeight={700} fontSize={"sm"} fontColor={'black40'} className="mb-[2]">{item.device_type.name}</Txt>
//                 <Txt fontWeight={700} fontSize={"xl"} fontColor={'textDefault'}>{item.device.name}</Txt>
//             </View>
//         </TouchableOpacity>
//     );
// }

const renderItem = (({item}: { item: Request}) => {
    return (
        <TouchableOpacity className="px-4 py-4 flex-row bg-white rounded-lg">
             <View className='w-[72px] h-20 rounded-[3px] px-2 py-2 mr-4 bg-neutral-550'>
                 <FastImage
                     className="w-full h-full"
                     source={item.image}
                     resizeMode={FastImage.resizeMode.contain}
                 />
             </View>
             <View className="pt-1">
                 <Txt fontWeight={700} fontSize={"sm"} fontColor={'black40'} className="mb-[2]">{item.deviceType}</Txt>
                 <Txt fontWeight={700} fontSize={"xl"} fontColor={'textDefault'}>{item.deviceName}</Txt>
                 <View className='flex flex-row gap-x-1 mt-[2px]'>
                 {item.issues.map((issue, index) => (
                    <View key={index} className={`rounded-[4px] ${issue.type === 'screen_replacement' ? 'bg-red-15' : 'bg-paleMint'}`}>
                        <Txt className={`px-2 py-1`} fontWeight={400} fontSize={'sm'} fontColor={'neutral300'}>{issue.label}</Txt>
                    </View>
                 ))}
                 </View>
                 <View className='flex-row pt-2'>
                    <Txt fontSize={'sm'} fontColor={'neutral300'} fontWeight={500}>Status: </Txt>
                    <Txt fontSize={'sm'} fontWeight={500} fontColor={'textGreen'}>{item.status}</Txt>
                 </View>
                 <Txt className='pt-2' fontSize={'sm'} fontWeight={500} fontColor={'black40'}>{item.timeStamp}</Txt>
                 <Txt className='pt-2' fontSize={'sm'} fontWeight={500} fontColor={'black40'}>ID: {item.requestId}</Txt>
                 <Txt className='pt-2' fontSize={'sm'} fontWeight={500} fontColor={'black40'}>Repair value: ₹{item.repairValue}</Txt>
                 <View className='flex-row gap-x-[10px] pt-4'>
                    <Button paddingVertical={10} paddingHorizontal={54} label={"View Details"} size={'base'} weight={500} variant={'info'} />
                    <TouchableOpacity>
                        <SvgCall />
                    </TouchableOpacity>
                 </View>
             </View>
         </TouchableOpacity>
    )
})
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
                        showsVerticalScrollIndicator={false}
                        data={DATA}
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