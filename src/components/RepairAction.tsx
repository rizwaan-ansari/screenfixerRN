import React, { useContext, useState } from 'react';
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
import { fileUpload, updateRepairRequests } from '../utils/api/ApiRequest';
import { Circle } from 'react-native-animated-spinkit';


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
    comment: z.string().max(200, "Comment cannot exceed 200 characters").optional(),
    repairStatus: z.string().min(1, "Repair status selection is required"),
    files: z.array(z.object({
        type: z.string(),
        mime_type: z.string(),
        url: z.string(),
        thumbnail: z.string().optional(),
        files: z.any()
    }))
});

type FormData = z.infer<typeof formSchema>;

const RepairAction = ({ refetch }: RepairActionFormProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const item: any = contextData.repairRequestItem;
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { control, handleSubmit, setValue, reset, watch, getValues, clearErrors, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
            repairStatus: '',
        }
    });
    const files = watch('files')

    const onSubmit = async (data: FormData) => {
        try {
            const FORM_DATA = {
                uuid: item?.uuid,
                [`before_repair_comment`]: {
                    comment: data.comment,
                    files: (Array.isArray(data?.files) ? data?.files : []).map((item: any) => ({
                        files: item?.files,
                        type: item?.type,
                        mime_type: item?.mime_type
                    }))
                }
            }
            await updateRepairRequests({ ...FORM_DATA }).then(() => {
                refetch();
                reset();
            })
        } catch (error) {
            console.log("Error updating repair action")
        }
    };

    const removeImage = (index: number) => {
        setValue('files', files.filter((_: any, i: any) => i !== index));
    };
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
            <Controller
                name={'files'}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <MediaUploader
                        onSelected={({ file, fileType, displayLoader }) => {
                            setIsUploading(true);
                            fileUpload({
                                file,
                                onUploadSuccess: ({ payload }) => {
                                    setIsUploading(false);
                                    const newValue = {
                                        type: fileType,
                                        mime_type: payload?.mime_type || (fileType === 'video' ? "video/mp4" : 'image/jpeg'),
                                        url: `${payload?.base_url}${payload?.files?.file}`,
                                        thumbnail: `${payload?.base_url}${payload?.files?.file}`,
                                        files: payload.files,
                                    };
                                    onChange(value ? [newValue, ...value] : [newValue])
                                },
                                onUploadError: (error) => {
                                    setIsUploading(false);
                                    console.log('File Upload Failed', error);
                                },
                                onUploadComplete: () => {
                                    console.log("Upload process completed")
                                }
                            })
                        }}
                    >
                        <View className='!h-[200] relative mt-[15px] !w-full bg-neutral-550 rounded-[10px] justify-center items-center' style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <SvgUpload />
                            <Txt fontSize={"sm"} className={`mt-[10px] ${isUploading ? 'hidden' : 'flex'}`}>Upload Image or Video</Txt>
                        {isUploading && (
                            <View className="absolute rounded-[10px] top-0 left-0 bottom-0 right-0 inset-0 bg-black-160 justify-center items-center">
                                <Circle size={50} color="#002E86" />
                            </View>
                        )}
                        </View>
                    </MediaUploader>
                )}
            />
            <View className='mt-[15px] flex-row flex-wrap gap-x-2'>
                {files?.map((file, index) => (
                    <View key={`imageIndex-${index}`}>
                        <FastImage
                            source={{ uri: file.url }}
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