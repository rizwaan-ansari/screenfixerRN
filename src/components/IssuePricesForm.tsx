import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { z } from 'zod';
import { SvgAdd, SvgDelete } from '../assets/images';
import { useDataContext } from '../hooks/useDataContext';
import COLOR_PALETTE from '../utils/ColorConstant';
import Button from './Button';
import HorizontalSelect, { Option } from './HorizontalSelect';
import Txt from './Txt';

const QUALITY: Option[] = [
    {
        label: "Premium",
        slug: "premium",
    },
    {
        label: "Original",
        slug: "original",
    },
]

const formSchema = z.object({
    issues: z.array(z.object({
        price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
        warranty: z.string().min(1, "Warranty is required").regex(/^\d+$/, "Warranty must be a number"),
        partUsed: z.string().min(1, "Part used is required"),
        quantity: z.string().min(1, "Quantity is required").regex(/^\d+$/, "Quantity must be a number"),
        quality: z.string().min(1, "Quality selection is required")
    }))
})

const handleIssuePress = async () => {
    await SheetManager.show("issue-list-drawer")
}
const handleQualityPress = () => {
    console.log("Hello")
}
const IssuePricesForm = () => {
    const { contextData, setContextData } = useDataContext();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            issues: [{
                price: '',
                warranty: '',
                partUsed: '',
                quantity: '',
                quality: ''
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "issues",
    })

    const addNewIssue = () => {
        append({
            price: '',
            warranty: '',
            partUsed: '',
            quantity: '',
            quality: ''
        })
    }

    const deleteIssue = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    }

    const onSubmit = (data: any) => {
        console.log(data)
        setContextData({ editIssueDetails: false })
    }
    const onPressCancel = () => {
        setContextData({ editIssueDetails: false })
    }

    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center'>
            <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>Issue and Prices</Txt>
            <View className='w-full border border-[#E2E2E2] mt-[15px]' />
            {fields.map((field, index) => (
                <View key={`issueForm-${index}`}>
                    <TouchableOpacity onPress={handleIssuePress} className='pointer-events-auto'>
                        <TextInput
                            label={"Issue"}
                            mode={"outlined"}
                            right={<TextInput.Icon icon={() => <AntDesign name="caretdown" size={10} color={COLOR_PALETTE.GRAY_65} />} />}
                            editable={false}
                            outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                            activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                            className='bg-white20 mt-[15px] text-sm text-gray65'
                            pointerEvents={'none'}
                            theme={{
                                roundness: 8,
                            }}
                        />
                    </TouchableOpacity>
                    <Txt fontSize={"base"} className='mt-[15px] mb-2 pl-4'>Quality</Txt>
                    <View className='mt-2'>
                        <HorizontalSelect
                            contentContainerStyle={{ flexDirection: 'row' }}
                            multiple={false}
                            options={QUALITY}
                            onSelect={(selectedItem) => setValue(`issues.${index}.quality`, String(selectedItem))}
                        />
                        {errors.issues?.[index]?.quality && <Txt className='pt-1 pl-1' fontColor={'textDanger'}>{errors.issues[index].quality.message}</Txt>}
                    </View>
                    <Controller
                        control={control}
                        name={`issues.${index}.price`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                label={"Price"}
                                right={<TextInput.Affix textStyle={{ color: "#A5A5A5" }} text='₹' />}
                                mode={'outlined'}
                                outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                                activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                                className='bg-white20 mt-[8px] text-sm text-gray65'
                                theme={{
                                    roundness: 8,
                                }}
                                error={!!errors.issues?.[index]?.price}
                            />
                        )}
                    />
                    {errors.issues?.[index]?.price && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues[index].price.message}</Txt>}
                    <Controller
                        control={control}
                        name={`issues.${index}.warranty`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                label={"Warranty"}
                                right={<TextInput.Affix textStyle={{ color: "#A5A5A5" }} text='months' />}
                                mode={'outlined'}
                                outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                                activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                                className='bg-white20 mt-[15px] text-sm'
                                theme={{
                                    roundness: 8,
                                }}
                                error={!!errors.issues?.[index]?.warranty}
                            />
                        )}
                    />
                    {errors.issues?.[index]?.warranty && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues?.[index]?.warranty.message}</Txt>}
                    <Controller
                        control={control}
                        name={`issues.${index}.partUsed`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                label={"Part Used"}
                                mode={'outlined'}
                                outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                                activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                                className='bg-white20 mt-[15px] text-sm'
                                theme={{
                                    roundness: 8,
                                }}
                                error={!!errors.issues?.[index]?.partUsed}
                            />
                        )}
                    />
                    {errors.issues?.[index]?.partUsed && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues?.[index]?.partUsed.message}</Txt>}
                    <View className='flex-row mt-[15px]'>
                        <View className={`${index > 0 ? 'w-4/5' : 'w-full'}`}>
                            <Controller
                                control={control}
                                name={`issues.${index}.quantity`}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        label={"Quantity"}
                                        mode={'outlined'}
                                        outlineColor={COLOR_PALETTE.OFF_WHITE_200}
                                        activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                                        className='bg-white20 text-sm'
                                        theme={{
                                            roundness: 8,
                                        }}
                                        error={!!errors.issues?.[index]?.quantity}
                                    />
                                )}
                            />
                            {errors.issues?.[index]?.quantity && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues?.[index]?.quantity.message}</Txt>}
                        </View>
                        {index > 0 ?
                            <TouchableOpacity className={`mt-auto w-[50px] h-[50px] bg-neutral-550 justify-center items-center rounded-lg ml-[15px] border border-[#EBEBEB]`} onPress={() => deleteIssue(index)}>
                                <SvgDelete />
                            </TouchableOpacity>
                            :
                            ''
                        }
                    </View>
                    {index !== fields.length - 1 && (
                        <View style={{ marginTop: 20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                    )}
                    {index === fields.length - 1 && (
                        <TouchableOpacity className='flex-row items-center mt-5 pl-[5px]' onPress={addNewIssue}>
                            <SvgAdd />
                            <Txt fontSize={"base"} fontColor={"textDefault"} fontWeight={500} className='pl-[10px]'>Add Issue</Txt>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            <Button label={"Cancel"} marginTop={20} onPress={onPressCancel} variant={"info"} />
            <Button label={"Save"} marginTop={15} onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default IssuePricesForm