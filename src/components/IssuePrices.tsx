import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Txt from './Txt'
import FastImage from 'react-native-fast-image'

import ISSUES from '../data/issues.json';
import { BATTERY_IMG } from '../assets/images';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleRepairRequest } from '../utils/api/ApiRequest';
import { useRoute } from '@react-navigation/native';
import { ContextData } from '../providers/ContextProvider';

interface IssuePricesProps {
    onPressUpdate: () => void;
}

interface Charge {
    label: string;
    price: number;
}

const IssuePrices = ({ onPressUpdate }: IssuePricesProps) => {
    const{ contextData, setContextData } = useContext(ContextData);

    const item: any = contextData.repairRequestItem;
    const formatter = new Intl.NumberFormat('en-IN');
    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center'>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>Issue and Prices</Txt>
            <View className='w-full border border-[#E2E2E2] mt-[15px]' />
            <View className='-mt-[5px]'>
                {item?.issues.map((issue: any, issueIndex: number) => (
                    <View key={`issuePrice-${issueIndex}`} className='flex-row items-center gap-x-[15px] mt-5'>
                        <View className='w-[38px] h-[38px]'>
                            <FastImage
                                source={{uri: `${issue.default.icon}`}}
                                className='w-full h-full'
                            />
                        </View>
                        <View className='flex-row justify-between flex-1'>
                            <View>
                                <Txt fontWeight={700} fontSize={"base"} fontColor={"darkSlate"}>{issue.default.description}</Txt>
                                {issue?.default.prices.map((price: any, priceIndex: number) => (
                                    <View key={`quality-${priceIndex}`} className='flex-row pt-[5px] flex-wrap'>
                                        <Txt fontSize={"sm"} fontColor={"neutral300"}>{`${price.quality.charAt(0).toUpperCase() + price.quality.slice(1)},`} </Txt>
                                        <Txt fontSize={"sm"} fontColor={"neutral300"}>{price.warranty_in_months.toLocaleString()} months warranty</Txt>
                                    </View>
                                ))}
                            </View>
                            {issue?.default.prices.map((price: any, priceIndex: number) => (
                                <Txt key={`price-${priceIndex}-${issueIndex}`} fontWeight={400} fontColor={"black"} fontSize={"base"}>{`₹${formatter.format(price.price)}`}</Txt>
                            ))}
                        </View>
                    </View>
                ))}
                <View className='ml-[53px]'>
                <View className='mt-[15px] mb-[6px]' style={{ height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }}></View>
                    {item?.price_summary.additional_charges.map((charge: Charge, index: number) => (
                        <View key={`addCharge-${index}`} className='flex-row items-center justify-between pt-[10px]'>
                            <Txt className='' fontColor={"neutral300"}>{charge.label}</Txt>
                            <Txt>{`₹${formatter.format(charge.price)}`}</Txt>
                        </View>
                    ))}
                    <View className='mt-[15px] mb-2' style={{ height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }}></View>
                    <View className='flex-row items-center justify-between'>
                        <Txt fontColor={"neutral300"} className='mt-2 mb-[10px]'>{`${item?.price_summary.total.label} Price`}</Txt>
                        <Txt fontColor={"brand"} fontWeight={700} fontSize={"xl"}>{`₹${formatter.format(item?.price_summary.total.price_after_discount)}`}</Txt>
                    </View>
                </View>
                <Button borderRadius={8} marginTop={10} onPress={onPressUpdate} variant={"info"} label={"Update"} />
            </View>
        </View>
    )
}

export default IssuePrices;