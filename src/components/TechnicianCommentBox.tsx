import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Txt from './Txt'
import FastImage from 'react-native-fast-image'
import { REDMI_NOTE_6_PRO_IMG, SvgEdit } from '../assets/images'

interface TechnicianCommentBoxProps {
    title: string;
    type?: string;
    description: string;
    hasEditIcon?: boolean;
}

const TechnicianCommentBox = ({title, type, description, hasEditIcon}: TechnicianCommentBoxProps) => {

  return (
    <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
        <View className='flex-row justify-between'>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>{title}</Txt>
            {
                hasEditIcon &&
                <TouchableOpacity className='w-5 h-5'>
                    <SvgEdit />
                </TouchableOpacity> 
            }
        </View>
        <Txt className='pt-[10px]' fontSize={"base"} fontColor={'black60'}>{description}</Txt>
        <View className='w-full flex-row flex-wrap'>
            <View className='h-16 w-16 mt-[15px] relative'>
                <FastImage 
                    source={REDMI_NOTE_6_PRO_IMG}
                    className='w-full h-full rounded-md'
                />
            </View>
        </View>
    </View>
  )
}

export default TechnicianCommentBox