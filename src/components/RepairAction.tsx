import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import HorizontalSelect, { Option } from './HorizontalSelect';
import Txt from './Txt';
import Button from './Button';
import COLOR_PALETTE from '../utils/ColorConstant';
import MediaUploader from './MediaUploader';
import { SvgAdd, SvgCross, SvgUpload } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import FastImage from 'react-native-fast-image';
import { QueryObserverResult } from '@tanstack/react-query';


type RefetchFunction = () => Promise<QueryObserverResult<any, unknown>>;
interface RepairActionFormProps {
    refetch: RefetchFunction;
}

const REPAIR_STATUS: Option[] = [
    { label: "Work-in-progress", slug: "work-in-progress" },
    { label: "Offsite Repair", slug: "offsite-repair" },
    { label: "Completed", slug: "completed" },
];

const formSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(200, "Comment cannot exceed 200 characters"),
    repairStatus: z.string().min(1, "Repair status selection is required"),
});

type FormData = z.infer<typeof formSchema>;

const RepairAction = ({ refetch }: RepairActionFormProps) => {
    const { contextData, setContextData } = useContext(ContextData); 
    const { control, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
            repairStatus: '',
        }
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const removeImage = (index: number) => {
        const updatedImages = (contextData.addImages || []).filter((_, i) => i != index)
        setContextData({
            addImages: updatedImages
        })
    }
    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
            <Txt fontWeight={700} fontSize={'xl'}>Repair Action</Txt>
            <View className='border border-[#E2E2E2] mt-[15px]' />
            <View className='bg-white20 rounded-lg mt-[15px]'>
                <Txt className='py-[17px] w-full pl-[15px]'>Repair Status</Txt>
            </View>
            <HorizontalSelect
                contentContainerStyle={{ flexDirection: 'row', marginTop: 15 }}
                multiple={false}
                options={REPAIR_STATUS.filter(item => item.label !== "Completed")}
                onSelect={(selectedItem) => {
                    if (typeof selectedItem === 'string' || typeof selectedItem === 'number') {
                        setValue('repairStatus', String(selectedItem));
                        clearErrors("repairStatus");
                    }
                }}
            />
            {errors.repairStatus && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.repairStatus.message}</Txt>}
            <MediaUploader>
                <View className='h-[200] mt-[15px] w-full bg-neutral-550 rounded-[10px] justify-center items-center' style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <SvgUpload />
                    <Txt fontSize={"sm"} className='mt-[10px]'>Upload Image or Video</Txt>
                </View>
            </MediaUploader>
            <View className='mt-[15px] flex-row flex-wrap gap-x-2'>
                {contextData?.addImages?.map((uri, index) => (
                    <View key={`imageIndex-${index}`}>
                        <FastImage 
                            source={{uri: uri}}
                            className='w-16 h-16 rounded-md'
                            resizeMode={"cover"}
                        />
                        <TouchableOpacity className='absolute -top-2 -right-2' onPress={() => removeImage(index)}>
                            <SvgCross />
                        </TouchableOpacity>
                    </View>
                ))}
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
            <Button borderRadius={8} label={"Update"} marginTop={15} onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default RepairAction;