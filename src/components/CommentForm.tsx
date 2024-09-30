import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Txt from './Txt';
import MediaUploader from './MediaUploader';
import { SvgCamera, SvgCross } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-paper';
import COLOR_PALLETE from '../utils/ColorConstant';
import Button from './Button';

interface CommentFormProps {
    type?: string;
    title?: string;
}

const CommentForm = ({ type, title }: CommentFormProps) => {
    const { contextData, setContextData } = useContext(ContextData);

    const removeImage = (index: number) => {
        const updatedImages = (contextData.addImages || []).filter((_, i) => i != index)
        setContextData({
            addImages: updatedImages
        })
    }
  return (
    <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
        <Txt fontWeight={700} fontSize={'xl'}>{title}</Txt>
        <View className='border border-[#E2E2E2] mt-[15px]' />
        <View className='mt-[15px] flex-row items-center'>
            <MediaUploader>
                <View className='w-[60px] h-[60px] bg-white20 rounded-lg justify-center items-center' style={{ borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <SvgCamera />
                </View>
            </MediaUploader>
            <View className='flex-row gap-x-2 ml-2'>
                {contextData.addImages?.map((uri, index) => (
                    <View className=''>
                        <FastImage 
                            source={{uri: uri}}
                            className='w-[60px] h-[60px] object-contain rounded-lg relative'
                        />
                        <TouchableOpacity className='absolute -top-2 -right-2' onPress={() => removeImage(index)}>
                            <SvgCross />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
        <TextInput 
            label={"Comment"}
            mode={'outlined'}
            outlineColor={COLOR_PALLETE.OFF_WHITE_200}
            activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
            multiline={true}
            className='bg-white20 mt-[15px] text-sm text-gray65 h-[80px]'
        />
        <View className='border border-[#E2E2E2] mt-[15px]' />
        <View className='flex-row mt-[15px]'>
            <Button label={"Cancel"} flex={1} width={1/2} variant={'info'} />
            <Button label={"Update"} marginLeft={15} flex={1} width={1/2} />
        </View>
    </View>
  )
}

export default CommentForm