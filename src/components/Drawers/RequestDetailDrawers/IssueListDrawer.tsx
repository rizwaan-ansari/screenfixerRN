import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

import ISSUESLIST from '../../../data/issues-list.json';
import Button from '../../Button';
import Txt from '../../Txt';
import { useQuery } from '@tanstack/react-query';
import { fetchIssues } from '../../../utils/api/ApiRequest';
import { ContextData } from '../../../providers/ContextProvider';


interface Issue {
    icon: string;
    description: string;
    uuid: string;
}


const IssueListDrawer = () => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>();
    const [selectedIssue, setSelectedIssue] = useState<any | null>();
    const { height } = Dimensions.get('window');
    const cardColors = ["#FCE7E6", "#D5E7E8", "#E7D5E6", "#DEF1FF"];
    const [shuffledColors, setShuffledColors] = useState<string[]>([]);
    const {contextData, setContextData} = useContext(ContextData);

    const item: any = contextData.repairRequestItem;
    const deviceUuid = item?.device?.uuid;
    const deviceTypeUuid = item?.device_type?.uuid;
    const brandUuid = item?.brand?.uuid;

    const { data, isLoading, isError, isSuccess, refetch } = useQuery({
        queryKey: ['issuesList', deviceTypeUuid, deviceUuid, brandUuid],
        queryFn: () =>  fetchIssues({
            device_type_uuid: deviceTypeUuid, 
            brand_uuid: brandUuid, 
            device_uuid: deviceUuid, 
            enabled: true
        }),
        enabled: Boolean(deviceUuid && deviceTypeUuid && brandUuid)
    })

    // const {data, isLoading, isError, isSuccess, refetch} = useQuery({
    //     queryKey: ['issueList'],
    //     queryFn:  fetchIssues,
    // })
    if (isError) {
        return(
            console.log("Error fetching Data")
        )
    }

    // if (data) {
    //     console.log("***********************")
    //     console.log(JSON.stringify(data?.data.payload, null, 4));
    //     console.log("***********************Data2")
    // }
    const issueList = data?.data?.payload;

    const randomizeColors = () => {
        let colors = [...cardColors];
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors;
    };

    const handlePress = (index: number, issue: Issue) => {
        setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
        setSelectedIssue((prevIssue: { uuid: string; }) => (prevIssue?.uuid === issue.uuid ? null : issue));
    }

    const handleAddPress = async () => {
        const formattedIssue = {
            id: selectedIssue.uuid,
            label: selectedIssue.description
        }
        await SheetManager.hide("issue-list-drawer", {
            payload: formattedIssue
        })
        console.log("Hello",JSON.stringify(formattedIssue, null, 4))
    }

    useEffect(() => {
        setShuffledColors(randomizeColors());
    }, []);
    return (
        <ActionSheet containerStyle={{ height: height * 0.7, padding: 16 }} gestureEnabled={true}>
            <ScrollView className='h-full' showsVerticalScrollIndicator={false}>
                <View className='flex-row flex-wrap'>
                    {issueList?.items.map((issue: Issue, index: number) => (
                        <TouchableOpacity key={`issueDrawer-${index}`} className='mt-1 w-1/3 items-center' onPress={() => handlePress(index, issue)}>
                            <View className={`relative w-[90px] rounded-[10px] h-[90px] mt-2 ${selectedIndex === index ? 'border border-black' : ''}`} style={{ backgroundColor: shuffledColors[index % shuffledColors.length] }}>
                                {selectedIndex === index ?
                                    <View className='absolute -right-1 -top-1 rounded-full' style={{ backgroundColor: shuffledColors[index % shuffledColors.length] }}>
                                        <AntDesign name={"checkcircleo"} size={24} />
                                    </View>
                                    :
                                    ''
                                }
                                {issue.icon ?
                                    <FastImage
                                        // source={{ uri: issue.icon}}
                                        source={{ uri: "https://i.ibb.co/G5bpFhZ/mobile-front-glass-broken.png"}}
                                        className='w-full h-full'
                                    />
                                    :
                                    <FastImage
                                        source={{ uri: "https://i.ibb.co/rHCvx4g/issue-placeholder.png" }}
                                        className='w-full h-full'
                                    />
                                }
                            </View>
                            <Txt fontSize={'base'} fontWeight={500} fontColor={"neutral300"} className='text-balance text-center max-w-[6.25rem] pt-2'>{issue.description}</Txt>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Button onPress={() => handleAddPress()} borderRadius={8} label={"Add"} />
        </ActionSheet>
    )
}

export default IssueListDrawer