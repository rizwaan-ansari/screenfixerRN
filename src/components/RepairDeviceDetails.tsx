import { RouteProp } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgMobileShadow } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import { Request } from '../screens/RequestsScreen';
import COLOR_PALETTE from '../utils/ColorConstant';
import Txt from './Txt';
import moment from "moment";


type RootStackParamList = {
    RequestsScreen: undefined;
    DetailsScreen: {
        requestData: Request;
        uuid: string;
    };
};

type RepairDeviceDetailsRouteProp = RouteProp<RootStackParamList, 'DetailsScreen'>;

type status = "in-progress" | "technician-assigned" | "completed" | any;

const STATUS_MAPPER: Record<status, { label: string, color: string }> = {
    'in-progress': {
        label: "Work-in-progress",
        color: COLOR_PALETTE.TEXT_GREEN
    },
    'technician-assigned': {
        label: "Technician Assigned",
        color: COLOR_PALETTE.DARK_SLATE
    },
    'completed': {
        label: "Completed",
        color: COLOR_PALETTE.BRAND
    }
}
const uuid2: string = "e0cc7a84-00c3-4b59-900e-de069d6e96b2";

const RepairDeviceDetails = () => {

    const { contextData, setContextData } = useContext(ContextData);
    const item: any = contextData.repairRequestItem;
    if (contextData.isLoading) {
         console.log("Loading");
         return null;
    }
    console.log("***********************")
    console.log(JSON.stringify(item, null, 4));
    console.log("***********************")

    const formattedDate = moment(item?.technician_assigned_at).format('ddd, DD MMM YYYY, hh:mm A')
    const issuesText = item?.issues?.map((issue: any) => issue.default.description).join(', ');
    return (
        <View className='p-5 bg-white m-4 rounded-[10px]'>
            <View className='relative mx-auto overflow-hidden w-[100px] rounded-[30px] h-[100px] bg-offWhite flex justify-center items-center'>
                <FastImage
                    source={{
                        uri: `${item?.device.picture.files_base_url}${item?.device.picture.files.file}`
                    }}
                    className='w-[52px] h-[67px] z-10'
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View className='absolute top-[17%] left-[26%] w-[83px] h-[70px]'>
                    <SvgMobileShadow />
                </View>
            </View>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"} className='mx-auto mt-[15px]'>{item?.device.name}</Txt>
            <Txt fontSize={"base"} fontWeight={500} fontColor={"textGreen"} className='mx-auto mt-2'>{STATUS_MAPPER[item?.status]?.label}</Txt>
            <View className='mt-6'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Booking Id
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item?.id}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Assigned date
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{formattedDate}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Device Type
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item?.device_type.name}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Brand
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item?.brand.name}</Txt>
            </View>
            <View className='mt-[15px]'>
                <Txt fontSize={"sm"} fontWeight={500} fontColor={'black40'}>
                    Device
                </Txt>
                <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item?.device.name}</Txt>
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
                {item?.imei_number === null ? 
                <TouchableOpacity className='mt-2' onPress={() =>  setContextData(prevState => ({...prevState, editIMEINumber: true }))}>
                    <Txt fontSize={"base"} fontWeight-={500} fontColor={"textDanger"}>Add+</Txt>
                </TouchableOpacity>
                :
                    <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item?.imei_number}</Txt> 
            }
                {/* <Txt className='mt-2' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>---</Txt> */}
            </View>
        </View>
    );
};

export default RepairDeviceDetails;