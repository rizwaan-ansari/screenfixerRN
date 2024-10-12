import { NavigationProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import React, { useContext, useEffect, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
    CLOCK_IMG,
    HOUR_GLASS_IMG,
    PROFILE_PICTURE_IMG,
    REPAIR_IMG
} from '../assets/images';
import { Txt } from '../components';
import CommentForm from '../components/CommentForm';
import CustomerInfo from '../components/CustomerInfo';
import EditRepairDetailsForm from '../components/EditRepairDetailsForm';
import HeaderTabBar from '../components/HeaderTabBar';
import InfoCard from '../components/InfoCard';
import IssuePrices from '../components/IssuePrices';
import IssuePricesForm from '../components/IssuePricesForm';
import RepairAction from '../components/RepairAction';
import RepairDeviceDetails from '../components/RepairDeviceDetails';
import RepairTypeCard from '../components/RepairType';
import TechnicianCommentBox from '../components/TechnicianCommentBox';
import { ContextData } from '../providers/ContextProvider';
import { fetchSingleRepairRequest } from '../utils/api/ApiRequest';

type RepairType = "onsite" | "offsite" | "office-visit";
const REPAIR_TYPE_MAPPER: Record<RepairType, {label: string}> = {
    "onsite": { label: 'On-site Repair' },
    "offsite": { label: 'Off-site Repair' },
    "office-visit": { label: 'Office Visit Repair' }
};

const RequestDetailsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const { contextData, setContextData } = useContext(ContextData);
    const scrollViewRef = useRef<ScrollView>(null);
    const editRepairDetailsFormRef = useRef<View>(null);
    const issuePriceFormRef = useRef<View>(null);
    const technicianCommentBoxRef = useRef<View>(null);
    const route = useRoute();
    const { uuid } = route.params as { uuid: string };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['singleRepairRequestList', uuid],
        queryFn: () => fetchSingleRepairRequest(uuid),
        enabled: !!uuid,
    });

    const item = data?.data?.payload;

    useEffect(() => {
        if (item) {
            setContextData({
                repairRequestItem: item,
                isLoading,
                isError,
            });
        }
    }, [item, isLoading, isError]);

    useEffect(() => {
        if (contextData.editIMEINumber) {
            scrollToForm(editRepairDetailsFormRef);
        } else if (contextData.editIssueDetails) {
            scrollToForm(issuePriceFormRef);
        } else if (contextData.editBeforeRepair) {
            scrollToForm(technicianCommentBoxRef);
        }
    }, [contextData.editIMEINumber, contextData.editIssueDetails, contextData.editBeforeRepair]);

    const scrollToForm = (formRef: React.RefObject<View>) => {
        if (formRef.current && scrollViewRef.current) {
            formRef.current.measureLayout(
                scrollViewRef.current.getScrollableNode() as any,
                (x, y) => {
                    scrollViewRef.current?.scrollTo({ y: y, animated: true });
                }
            );
        }
    };

    if (isLoading) {
        return console.log("Loading")
    }

    if (isError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: {(error as Error).message}</Text>
            </View>
        );
    }

    if (!item) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No data available</Text>
            </View>
        );
    }

    const formattedDate = moment(item.technician_assigned_at).format('ddd, DD MMM YYYY');
    const formattedTime = moment(item.technician_assigned_at).format('hh:mm A');
    const formattedAddressType = item.address_type.charAt(0).toUpperCase() + item.address_type.slice(1);

    return (
        <SafeAreaView className='w-full flex-1 bg-brand'>
            <HeaderTabBar />
            <KeyboardAvoidingView className='flex-1'
                behavior={Platform.OS === "ios" ? 'padding' : 'height'}
            >
                <ScrollView ref={scrollViewRef} className='w-full rounded-tl-xl rounded-tr-xl flex-1 bg-neutral-600 -mt-[15px]'>
                    <View className='flex-1 px-4 rounded-tl-xl rounded-tr-xl pt-[20px]'>
                        <DetailsHeader navigation={navigation} />
                        <View className='flex-row justify-between'>
                            <InfoCard
                                title={formattedDate}
                                subtitle={formattedTime}
                                backgroundColor="#D0EEF9"
                                borderColor="#63C7EC1A"
                                image={CLOCK_IMG}
                                imageStyle={{ width: 78, height: 75, right: '-15%', top: '125%' }}
                            />
                            <InfoCard
                                title={`${item.technician_assigned_in} Ago`}
                                subtitle="Requested"
                                backgroundColor="#F5E1E1"
                                borderColor="#CC757214"
                                image={HOUR_GLASS_IMG}
                                imageStyle={{ width: 64, height: 68, right: '-8%', top: '115%' }}
                            />
                        </View>
                        <RepairTypeCard
                            title={REPAIR_TYPE_MAPPER[item.repair_location as RepairType]?.label || 'Unknown Repair Type'}
                            subtitle="Repair Type"
                            image={REPAIR_IMG}
                        />
                    </View>
                    <View ref={editRepairDetailsFormRef}>
                        {contextData.editIMEINumber ?
                            <EditRepairDetailsForm refetch={refetch} />
                            :
                            <RepairDeviceDetails />
                        }
                    </View>
                    <View ref={issuePriceFormRef}>
                        {contextData.editIssueDetails ?
                            <IssuePricesForm refetch={refetch} />
                            :
                            <IssuePrices onPressUpdate={() => setContextData({ editIssueDetails: true })} />
                        }
                    </View>
                    <CustomerInfo
                        name={item.customer_name}
                        profilePicture={PROFILE_PICTURE_IMG}
                        address={`${formattedAddressType} - ${item.address_formatted}`}
                    />
                    <View ref={technicianCommentBoxRef}>
                        {
                            contextData.editBeforeRepair ?
                                <CommentForm refetch={refetch} title={'Edit Technician Comment Before'} type='before' />
                                :
                                <TechnicianCommentBox
                                    title={"Before Repair"}
                                    type={"before_repair_comment"}
                                    hasEditIcon={true}
                                    description={"The following was your device condition before repair"}
                                />
                        }
                    </View>
                    <RepairAction refetch={refetch} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const DetailsHeader = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View className='pb-4 flex-row items-center gap-[15px]'>
            <TouchableOpacity onPress={() => navigation.goBack()} className='w-[22px] h-[22px] rounded-full border border-[#A5A5A5] flex justify-center items-center'>
                <Text>
                    <FeatherIcon name="chevron-left" className='w-[5px] h-2' color={"#A5A5A5"} />
                </Text>
            </TouchableOpacity>
            <Txt fontSize="2xl" fontColor={'textDefault'} fontWeight={700}>Repair Details</Txt>
        </View>
    );
};

export default RequestDetailsScreen;