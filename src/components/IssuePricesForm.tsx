import React, { useEffect, useState } from 'react';

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
import { updateRepairRequests } from '../utils/api/ApiRequest';

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

interface IssuePricesFormProps {
    refetch: any;
}

const formSchema = z.object({
    issues: z.array(z.object({
        issue_uuid: z.object({
            id: z.string(),
            label: z.string(),
        }).optional().nullable(),
        quality: z.string().optional(),
        price: z.string({
            required_error: "Please enter the price",
            invalid_type_error: "Please enter the price",
        }).regex(/^\d+(\.\d{1,2})?$/, { message: 'Price must be in a valid money format (e.g. 10.99)' }).optional(),
        warranty_in_months: z.string().optional(),
        part_name: z.string().optional(),
        quantity: z.string().optional(),
        other_issue: z.string().optional().nullable()
    }))
});

type FormData = z.infer<typeof formSchema>
const IssuePricesForm = ({ refetch }: IssuePricesFormProps) => {
    const [, forceUpdate] = useState({});
    const { contextData, setContextData } = useDataContext();
    const item: any = contextData.repairRequestItem;
    console.log(JSON.stringify(item, null, 4), "data")
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            issues: (item?.issues || []).length > 0 
                ? (item?.issues || []).map((issueItem: any) => ({
                    issue_uuid: {
                        id: issueItem?.default?.uuid || '',
                        label: issueItem?.default?.description || '',
                    },
                    quality: issueItem.issue?.quality || '',
                    price: issueItem?.issue?.price ? String(issueItem?.issue?.price) : issueItem?.default?.price || '',
                    warranty_in_months: issueItem?.issue?.warranty_in_months ? String(issueItem?.issue?.warranty_in_months) : '',
                    part_name: issueItem?.issue?.part_name || '',
                    quantity: issueItem?.issue?.quantity ? String(issueItem?.issue?.quantity) : '',
                    other_issue: issueItem?.other_issue || null
                }))
                : [{
                    issue_uuid: { id: '', label: '' },
                    quality: '',
                    price: '',
                    warranty_in_months: '',
                    part_name: '',
                    quantity: '',
                    other_issue: ''
                }]
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "issues",
    })
    

    const addNewIssue = () => {
        append({
            issue_uuid: { id: '', label: '' },
            price: '',
            warranty_in_months: '',
            part_name: '',
            quantity: '',
            quality: '',
            other_issue: ''
        })
    }
    const handleIssuePress = async (index: number) => {
        const result = await SheetManager.show("issue-list-drawer", {
            payload: { currentIssue: getValues(`issues.${index}.issue_uuid.id`) }
        });
        if (result && typeof result === 'object' && 'id' in result && 'label' in result) {
            setValue(`issues.${index}.issue_uuid`, result, {shouldValidate: false});

            forceUpdate({});
        }
    };
    const deleteIssue = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    }

    const onSubmit = (data: FormData) => {

        try {
            const FORM_DATA = {
                uuid: contextData.repairRequestItem.uuid,
                update_prices: true,
                issues: data.issues.map((issue) => ({
                    issue_uuid: issue.issue_uuid?.id,
                    quality: issue.quality,
                    price: issue.price ? String(issue?.price) : item?.default?.price,
                    warranty_in_months: issue.warranty_in_months,
                    part_name: issue.part_name,
                    quantity: issue.quantity
                }))
            }
            updateRepairRequests(FORM_DATA).then(() => {
                setContextData({
                    editIssueDetails: false
                })
                refetch();
            })
        } catch (error) {
            console.log(error)
        }
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
                    <TouchableOpacity onPress={() => handleIssuePress(index)} className='pointer-events-auto'>
                        <TextInput
                            label={"Issue"}
                            mode={"outlined"}
                            value={getValues(`issues.${index}.issue_uuid.label`) || "Select an issue"}
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
                            value={getValues(`issues.${index}.quality`)}
                            onSelect={(selectedItem) => setValue(`issues.${index}.quality`, String(selectedItem))}
                        />
                        {errors.issues?.[index]?.quality && <Txt className='pt-1 pl-1' fontColor={'textDanger'}>{errors.issues?.[index]?.quality?.message}</Txt>}
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
                        name={`issues.${index}.warranty_in_months`}
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
                                error={!!errors.issues?.[index]?.warranty_in_months}
                            />
                        )}
                    />
                    {errors.issues?.[index]?.warranty_in_months && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues?.[index]?.warranty_in_months.message}</Txt>}
                    <Controller
                        control={control}
                        name={`issues.${index}.part_name`}
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
                                error={!!errors.issues?.[index]?.part_name}
                            />
                        )}
                    />
                    {errors.issues?.[index]?.part_name && <Txt className='pl-1 pt-1' fontColor={"textDanger"}>{errors.issues?.[index]?.part_name.message}</Txt>}
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
            <Button borderRadius={8} label={"Cancel"} marginTop={20} onPress={onPressCancel} variant={"info"} />
            <Button borderRadius={8} label={"Save"} marginTop={15} onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default IssuePricesForm