import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import React from "react";
import HeaderTabBar from "../components/HeaderTabBar";
import { Txt } from "../components";
import { GALAXY_ZFOLD_IMG, ONE_PLUS_10T_IMG, REDMI_NOTE_6_PRO_IMG } from "../assets/images";
import Button from "../components/Button";
import { SheetManager } from "react-native-actions-sheet";
import FastImage, { FastImageProps } from "react-native-fast-image";

const DATA = [
    {
        id: 1,
        image: REDMI_NOTE_6_PRO_IMG,
        deviceType: "Mobile Phone",
        deviceName: "Redmi Note 6 Pro",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
    {
        id: 2,
        image: ONE_PLUS_10T_IMG,
        deviceType: "Mobile Phone",
        deviceName: "OnePlus 10T 56",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
    {
        id: 3,
        image: GALAXY_ZFOLD_IMG,
        deviceType: "Mobile Phone",
        deviceName: "Galaxy Z Fold3 5G",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
    {
        id: 4,
        image: REDMI_NOTE_6_PRO_IMG,
        deviceType: "Mobile Phone",
        deviceName: "Redmi Note 6 Pro",
        repairValue: "8500",
        leadPrice: "800",
        timeStamp: "Aug 12, 2024, 12:40 PM",
    },
]

export type Lead = {
    id: number,
    image: FastImageProps['source'],
    deviceType: string,
    deviceName: string,
    repairValue: string,
    leadPrice: string,
    timeStamp: string
}

const LeadScreenHeader = () => {
    return (
        <View className="pb-4">
            <Txt fontSize={'2xl'} fontColor={'black'} fontWeight={700}>Purchase Leads</Txt>
        </View>
    )
}

const handlePress = (item: Lead) => {
    SheetManager.show('purchase-lead-drawer', {
        payload: item
    })
}

const renderItem = ({ item }: { item: Lead }) => {
    return (
        <TouchableOpacity className="bg-white p-4 rounded-lg mt-[10px]">
            <View className="flex-row mb-[10px]" key={item.id}>
                <View className="w-[74px] h-[80px] bg-white20 flex items-center justify-center rounded-[4px]">
                    {/* <Image source={item.image} className="w-[55px] h-[65.6px]" resizeMode="contain" /> */}
                    <FastImage
                        source={item.image}
                        className="w-[55px] h-[65.6px]"
                        resizeMode="contain"
                    />
                </View>
                <View className="px-4 pt-1">
                    <Txt fontSize={'sm'} fontWeight={400} fontColor={'black40'}>
                        {item.deviceType}
                    </Txt>
                    <Txt fontSize={'xl'} fontColor={'textDefault'} fontWeight={700}>
                        {item.deviceName}
                    </Txt>
                    <Txt fontWeight={500} fontSize={'sm'} fontColor={'textSuccess'} className="pt-2">
                        Repair value: ₹{item.repairValue}
                    </Txt>
                    <Txt fontSize={'sm'} fontWeight={500} fontColor={'black40'} className="pt-2">
                        {item.timeStamp}
                    </Txt>
                </View>
            </View>
            <View style={{height: 1, borderWidth: 1, borderStyle: 'dashed'}}>

            </View>
            <View className="flex-row justify-between items-center pt-3">
                <Txt fontWeight={700} fontColor={'textSuccess'} fontSize={'xl'}>
                    ₹{item.leadPrice}
                </Txt>
                <Button className="px-[40px] py-[10px]" label={"PURCHASE"} onPress={() => handlePress(item)}  />
            </View>
        </TouchableOpacity>
    )
}
const FindLeads = () => {
    return (
        <>
            <SafeAreaView className="w-full flex-1 bg-brand">
                <HeaderTabBar />
                <View className="flex-1 rounded-tl-xl rounded-tr-xl bg-neutral-600 -mt-[15px] pt-5 px-4">
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<LeadScreenHeader />}
                        data={DATA}
                        renderItem={renderItem}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default FindLeads