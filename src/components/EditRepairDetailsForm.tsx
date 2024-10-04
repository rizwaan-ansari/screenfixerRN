import React, { useContext } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';
import { ContextData } from '../providers/ContextProvider';
import COLOR_PALETTE from '../utils/ColorConstant';
import Button from './Button';
import Txt from './Txt';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateRepairRequests } from '../utils/api/ApiRequest';

const formSchema = z.object({
    imei_number: z.string().min(1, "IMEI number is required").regex(/^\d{16}$/, { message: "Invalid IMEI" })
});

type FormData = z.infer<typeof formSchema>;

interface EditRepairDetailsProps {
    refetch: any;
}

const EditRepairDetailsForm = ({ refetch }: EditRepairDetailsProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const item = contextData.repairRequestItem;

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imei_number: item?.imei_number || ''
        }
    });

    const onSubmit =  (data: FormData) => {
        try {
            const FORM_DATA = {
                uuid: item?.uuid,
                imei_number: data.imei_number
            };

            updateRepairRequests({
                ...FORM_DATA
            }).then(() => {
                setContextData({
                    editIMEINumber: false
                })
                refetch();
            })
            } catch (error) {
            console.error('Error updating IMEI number:', error);
        }
    };

    return (
        <View className='p-5 my-[15px] bg-white mx-4 rounded-[10px] justify-center'>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"} textAlign={"center"}>Edit Repair Details</Txt>
            <View className='w-full border border-[#E2E2E2] mt-[15px]' />
            <Controller
                control={control}
                name='imei_number'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label={"IMEI Number"}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        mode={"outlined"}
                        outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                        activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                        className='bg-white20 mt-[15px] text-sm text-gray65'
                        theme={{
                            roundness: 8,
                        }}
                        error={!!errors.imei_number}
                    />
                )}
            />
            {errors.imei_number && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.imei_number.message}</Txt>}
            <View className='w-full border border-[#E2E2E2] mt-[15px]' />
            <Button marginTop={15} label={"Cancel"} variant={"info"} onPress={() => setContextData({  editIMEINumber: false })}/>
            <Button marginTop={15} label={"Update"} onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default EditRepairDetailsForm;