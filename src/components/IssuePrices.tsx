import { View, Text } from 'react-native'
import React from 'react'
import Txt from './Txt'
import FastImage from 'react-native-fast-image'

import ISSUES from '../data/issues.json';

const IssuePrices = () => {
    return (
        <View className='p-5 bg-white m-4 rounded-[10px]'>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>Issue and Prices</Txt>
            <View className='w-full border border-[#E2E2E2] mt-[15px]' />
            <View className='mt-[15px]'>
                {ISSUES.map((issue, index) => (
                    <View  key={issue?.default.uuid} className='flex-row items-center'>
                        <View className='w-[38px] h-[38px]'>
                            <FastImage
                                source={{ uri: issue?.default.icon }}
                                className='w-full h-full'
                            />
                        </View>
                        <View className='flex-row justify-between flex-1'>
                        <Txt fontWeight={700} fontSize={"base"} fontColor={"darkSlate"}>{issue.default.description}</Txt>
                        {issue?.default.prices.map((price, index) => (
                            <Txt fontSize={"base"}>₹{price.price}</Txt>
                        ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default IssuePrices