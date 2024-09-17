import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Request } from '../screens/RequestsScreen';

type RootStackParamList = {
    RequestsScreen: undefined;
    DetailsScreen: {
        requestData: Request;
    };
};

type RepairDeviceDetailsRouteProp = RouteProp<RootStackParamList, 'DetailsScreen'>;

const RepairDeviceDetails = () => {
    const route = useRoute<RepairDeviceDetailsRouteProp>();
    const { requestData } = route.params;

    return (
        <View className='p-4'>
            <Text>Device Name: {requestData.deviceName}</Text>
            <Text>Device Type: {requestData.deviceType}</Text>
            <Text>Repair Value: {requestData.repairValue}</Text>
            <Text>Lead Price: {requestData.leadPrice}</Text>
            <Text>Status: {requestData.status}</Text>
            <Text>Request ID: {requestData.requestId}</Text>
            <Text>Timestamp: {requestData.timeStamp}</Text>
            {/* Add more details based on requestData */}
        </View>
    );
};

export default RepairDeviceDetails;