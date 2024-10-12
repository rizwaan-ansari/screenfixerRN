import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';
import { SvgCamera, SvgCross } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import COLOR_PALETTE from '../utils/ColorConstant';
import Button from './Button';
import MediaUploader from './MediaUploader';
import Txt from './Txt';
import { fileUpload, updateRepairRequests } from '../utils/api/ApiRequest';


interface CommentFormProps {
    type?: 'before' | 'after';
    title?: string;
    refetch?: any;
}

const formSchema = z.object({
    comment: z.string().min(1, "Comment is required").max(200, "Comment cannot exceed 200 characters"),
    files: z.array(z.object({
        type: z.string(),
        mime_type: z.string(),
        url: z.string(),
        thumbnail: z.string().optional(),
        files: z.any()
    }))
})


const CommentForm = ({ type, title, refetch }: CommentFormProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const item: any = contextData?.repairRequestItem;
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: item?.[`${type}_repair_comment`]?.comment || '',
            files: item?.[`${type}_repair_comment`]?.files?.map((file: any) => ({
                type: file.type || 'image',
                mime_type: file.mime_type || 'image/jpeg',
                url: `${item[`${type}_repair_comment`].files_base_url}${file.files.file}`,
                thumbnail: `${item[`${type}_repair_comment`].files_base_url}${file.files.file}`,
                files: file.files
            })) || [],
        }
    });

    const files = watch('files');

    const onSubmit = (data: any) => {
        try {
            const FORM_DATA = {
                uuid: item?.uuid,
                [`${type}_repair_comment`]: {
                    comment: data.comment,
                    files: data.files.map((file: any) => ({
                        files: file.files,
                        type: file.type,
                        mime_type: file.mime_type
                    }))
                }
            };
            
            updateRepairRequests(FORM_DATA).then(() => {
                setContextData({
                    editBeforeRepair: false
                });
                refetch && refetch();
            });
        } catch (error) {
            console.log("Error updating Comment", error);
        }
    };

    
    const removeImage = (index: number) => {
        setValue('files', files.filter((_:any, i:any) => i !== index));
    };
    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
            <Txt fontWeight={700} fontSize={'xl'}>{title}</Txt>
            <View className='border border-[#E2E2E2] mt-[15px]' />
            <View className='mt-[15px] flex-1 flex-row items-center flex-wrap -mx-2'>
                <Controller 
                    name="files"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <MediaUploader
                            onSelected={({file, fileType, displayLoader}) => {
                                displayLoader(true);
                                fileUpload({
                                    file,
                                    onUploadSuccess({ payload }) {
                                        displayLoader(false);
                                        const newValue = {
                                            type: fileType,
                                            mime_type: payload?.mime_type || (fileType === 'video' ? 'video/mp4' : 'image/jpeg'),
                                            url: `${payload?.files_base_url}${payload?.files?.file}`,
                                            thumbnail: `${payload?.files_base_url}${payload?.files?.file}`,
                                            files: payload.files
                                        };
                                        onChange([...value, newValue]);
                                    },
                                    onUploadError(error) {
                                        displayLoader(false);
                                        console.error('File upload failed:', error);
                                        // You might want to show an error message to the user here
                                    }
                                });
                            }}
                        >
                            <View style={{ width: 60, height: 60, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)', justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                                <SvgCamera />
                            </View>
                        </MediaUploader>
                    )}
                />
                    {item?.before_repair_comment.files?.map((uri: any, index: any) => (
                            <View key={`existingImage-${index}`} className='bg-[#E2E2E2] rounded-md mx-2 my-2'>
                                    <FastImage
                                        source={{ uri: `${item?.before_repair_comment?.files_base_url}${uri?.files?.file}` }}
                                        className='w-[60px] h-[60px] object-contain rounded-lg relative'
                                    />
                                <TouchableOpacity className='absolute -top-2 -right-2' onPress={() => removeImage(index)}>
                                    <SvgCross />
                                </TouchableOpacity>
                            </View>
                    ))}
                    {contextData.addImages?.map((uri, index) => (
                        <View key={`commentform-${index}`} className='bg-[#E2E2E2] rounded-md my-2'>
                            <FastImage
                                source={{ uri: uri }}
                                className='w-[60px] h-[60px] object-contain rounded-lg relative'
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
            {errors.comment && <Txt className='pt-1 pl-1' fontColor={'textDanger'}>{`${errors.comment.message}`}</Txt>}
            <View className='border border-[#E2E2E2] mt-[15px]' />
            <View className='flex-row mt-[15px]'>
                <Button borderRadius={8} label={"Cancel"} flex={1} width={1 / 2} variant={'info'} onPress={() => setContextData({ editBeforeRepair: false })} />
                <Button borderRadius={8} label={"Update"} marginLeft={15} flex={1} width={1 / 2} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default CommentForm