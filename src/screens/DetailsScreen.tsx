import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import HeaderTabBar from '../components/HeaderTabBar'
import { Txt } from '../components'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { CLOCK_IMG, HOUR_GLASS_IMG, PROFILE_PICTURE_IMG, REPAIR_IMG } from '../assets/images';
import InfoCard from '../components/InfoCard';
import RepairTypeCard from '../components/RepairType';
import { NavigationProp } from '@react-navigation/native';
import RepairDeviceDetails from '../components/RepairDeviceDetails';
import CustomerInfo from '../components/CustomerInfo';
import REPAIR_REQUEST from '../data/repair-request.json'
import IssuePrices from '../components/IssuePrices';

const repair_request = REPAIR_REQUEST.payload;

const REPAIR_TYPE:any = {
    'onsite':  'On-site Repair',
    'offsite': 'Off-site Repair',
    'office-visit': 'Off-site Repair',
};

const DetailsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const DetailsHeader = () => {
        return (
            <View className='pb-4 flex-row items-center gap-[15px]'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='w-[22px] h-[22px] rounded-full border border-[#A5A5A5] flex justify-center items-center'>
                    <Text>
                        <FeatherIcon name="chevron-left" className='w-[5px] h-2' color={"#A5A5A5"} />
                    </Text>
                </TouchableOpacity>
                <Txt fontSize="2xl" fontColor={'textDefault'} fontWeight={700}>Repair Details</Txt>
            </View>
        )
    }

    return (
        <SafeAreaView className='w-full flex-1 bg-brand'>
            <HeaderTabBar />
            <ScrollView className='w-full rounded-tl-xl rounded-tr-xl flex-1 bg-neutral-600 -mt-[15px]'>
                <View className='flex-1 px-4 rounded-tl-xl rounded-tr-xl pt-[20px]'>
                    <DetailsHeader />
                    <View className='flex-row justify-between'>
                        <InfoCard
                            title="Wed, 28 July 2023"
                            subtitle="09:00 AM"
                            backgroundColor="#D0EEF9"
                            borderColor="#63C7EC1A"
                            image={CLOCK_IMG}
                            imageStyle={{ width: 78, height: 75, right: '-15%', top: '125%' }}
                        />
                        <InfoCard
                            title="4 Hours Ago"
                            subtitle="Requested"
                            backgroundColor="#F5E1E1"
                            borderColor="#CC757214"
                            image={HOUR_GLASS_IMG}
                            imageStyle={{ width: 64, height: 68, right: '-8%', top: '115%' }}
                        />
                    </View>
                    <RepairTypeCard
                        title={REPAIR_TYPE[repair_request.repair_location]}
                        subtitle="Repair Type"
                        image={REPAIR_IMG}
                    />
                </View>    
                <RepairDeviceDetails />
                <CustomerInfo 
                    name='Jonathan David'
                    profilePicture={PROFILE_PICTURE_IMG}
                    address='Office - 202, Anshi Avenue, B/h Ketav Petrol Pump, Ambawadi, Bengaluru, Karnataka, 581320.'
                />
                <IssuePrices />
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsScreen