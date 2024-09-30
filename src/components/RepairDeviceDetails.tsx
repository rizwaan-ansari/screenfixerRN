import React, { useContext, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Request } from '../screens/RequestsScreen';
import FastImage from 'react-native-fast-image';
import { SvgMobileShadow } from '../assets/images';
import Txt from './Txt';
import { ContextData } from '../providers/ContextProvider';
import EditRepairDetailsForm from './EditRepairDetailsForm';

type RootStackParamList = {
    RequestsScreen: undefined;
    DetailsScreen: {
        requestData: Request;
    };
};

type RepairDeviceDetailsRouteProp = RouteProp<RootStackParamList, 'DetailsScreen'>;

const RepairDeviceDetails = () => {

    const { contextData, setContextData } = useContext(ContextData);
    const route = useRoute<RepairDeviceDetailsRouteProp>();
    const { requestData } = route.params;

    const issuesText = requestData.issues.map(issue => issue.label).join(', ');

    return (
        <View className='p-5 bg-white m-4 rounded-[10px]'>
            <View className='relative mx-auto overflow-hidden w-[100px] rounded-[30px] h-[100px] bg-offWhite flex justify-center items-center'>
                <FastImage
                    source={requestData.image}
                    className='w-[52px] h-[67px] z-10'
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View className='absolute top-[16%] left-[25%] w-[83px] h-[81px]'>
                    <SvgMobileShadow />
                </View>
            </View>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"} className='mx-auto mt-[15px]'>{requestData.deviceName}</Txt>
            <Txt fontSize={"base"} fontWeight={500} fontColor={"textGreen"} className='mx-auto mt-2'>{requestData.status}</Txt>
            <View className='mt-6'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Booking Id
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{requestData.requestId}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Assigned date
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{requestData.timeStamp}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Device Type
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{requestData.deviceType}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Brand
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>---</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Device
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{requestData.deviceName}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Issue
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{issuesText}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    IMEI number
                </Txt>
                {/* <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>---</Txt> */}
                <TouchableOpacity className='mt-2' onPress={() => { setContextData({ editIMEINumber: true }) }}>
                    <Txt fontSize={"base"} fontWeight-={500} fontColor={"textDanger"}>Add+</Txt>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RepairDeviceDetails;