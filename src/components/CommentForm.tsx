import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-paper';
import { SvgCamera, SvgCross } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import COLOR_PALETTE from '../utils/ColorConstant';
import Button from './Button';
import MediaUploader from './MediaUploader';
import Txt from './Txt';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentFormProps {
    type?: string;
    title?: string;
}

const formSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(200, "Comment cannot exceed 200 characters")
})

const onSubmit = (data: any) => {
    console.log(data)
}

const CommentForm = ({ type, title }: CommentFormProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        }
    })

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
                    <View key={`commentform-${index}`} className=''>
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
        <Controller 
            control={control}
            name={'comment'}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                    label={"Comment"}
                    mode={'outlined'}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                    activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                    multiline={true}
                    className='bg-white20 mt-[15px] text-sm text-gray65 h-[80px]'
                    theme={{
                        roundness: 8,
                    }}
                    error={!!errors.comment}
                />     
            )}
        />
        {errors.comment && <Txt className='pt-1 pl-1' fontColor={'textDanger'}>{errors.comment.message}</Txt>}
        <View className='border border-[#E2E2E2] mt-[15px]' />
        <View className='flex-row mt-[15px]'>
            <Button borderRadius={8} label={"Cancel"} flex={1} width={1/2} variant={'info'} onPress={() => setContextData({editBeforeRepair: false})} />
            <Button borderRadius={8} label={"Update"} marginLeft={15} flex={1} width={1/2} onPress={handleSubmit(onSubmit)} />
        </View>
    </View>
  )
}

export default CommentForm