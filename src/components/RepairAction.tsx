import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-paper';

import { SvgCross, SvgUpload } from '../assets/images';
import REPAIR_REQUEST from '../data/repair-request.json';
import COLOR_PALETTE from '../utils/ColorConstant';
import { useDataContext } from '../hooks/useDataContext';

import Button from './Button';
import HorizontalSelect, { Option } from './HorizontalSelect';
import MediaUploader from './MediaUploader';
import TechnicianCommentBox from './TechnicianCommentBox';
import Txt from './Txt';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';


const REPAIR_STATUS: Option[] = [
    {
        label: "Work-in-progress",
        slug: "work-in-progress"
    },
    {
        label: "Offsite Repair",
        slug: "offsite-repair"
    },
    {
        label: "Completed",
        slug: "completed"
    },
]

const formSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(200, "Comment cannot exceed 200 characters"),
    repairStatus: z.string().min(1, "Repair status selection is required"),
})

const onSubmit = (data: any) => {
    console.log(data)
}

const status = REPAIR_REQUEST.payload.status;
const RepairAction = () => {

    const { contextData, setContextData } = useDataContext();
    const { control, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
            repairStatus: '',
        }
    })

    const removeImage = (index: number) => {
        const updatedImages = (contextData.addImages || []).filter((_, i) => i !== index);
        setContextData({
            addImages: updatedImages
        })
    }

    return (
        <>
            <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
                <Txt fontWeight={700} fontSize={'xl'} className=''>Repair Action</Txt>
                <View className='border border-[#E2E2E2] mt-[15px]' />
                <View className='bg-white20 rounded-lg mt-[15px]'>
                    <Txt className=' py-[17px] w-full pl-[15px]'>Repair Status</Txt>
                </View>
                <HorizontalSelect
                    contentContainerStyle={{ flexDirection: 'row', marginTop: 15 }}
                    multiple={false}
                    options={REPAIR_STATUS
                        .filter(item => status === 'technician-assigned' && item.label !== "Completed")}
                    onSelect={(item) => {
                        console.log(item)
                        setValue(`repairStatus`, item)
                        clearErrors("repairStatus")
                    }}
                />
                {errors.repairStatus && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.repairStatus.message}</Txt>}
                <MediaUploader>
                    <View className='h-[210px] justify-center items-center bg-white20' style={{ borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 15, }}>
                        <SvgUpload />
                        <Txt fontSize={'sm'} textAlign={'center'} className='mt-[10px]'>Upload Image or Video</Txt>
                    </View>
                </MediaUploader>
                <View className='w-full flex-row gap-x-2 flex-wrap'>
                    {(contextData.addImages || []).map((uri, index) => (
                        <View className='h-16 w-16 mt-[15px] relative' key={`${index}-uri`}>
                            <FastImage
                                source={{ uri: uri }}
                                className='w-full h-full rounded-md'
                            />
                            <TouchableOpacity className='absolute -top-2 -right-2' onPress={() => removeImage(index)}>
                                <SvgCross />
                            </TouchableOpacity>
                        </View>
                    ))
                    }
                </View>
                <Controller
                    control={control}
                    name={'comment'}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            mode={'outlined'}
                            label={"Comment"}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                            activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                            className='mt-[15px] bg-white20 text-sm text-gray65'
                            error={!!errors.comment}
                        />
                    )}
                />
                {errors.comment && <Txt className='pt-1 pl-1' fontColor={'textDanger'}>{errors.comment.message}</Txt>}
                <Button label={"Update"} marginTop={15} onPress={handleSubmit(onSubmit)} />
            </View>
        </>
    )
}

export default RepairAction