import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import HorizontalSelect, { Option } from './HorizontalSelect';
import Txt from './Txt';
import Button from './Button';
import COLOR_PALETTE from '../utils/ColorConstant';

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

const RepairAction = () => {
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
    );
};

export default RepairAction;