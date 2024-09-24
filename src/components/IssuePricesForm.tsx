import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { z } from 'zod';
import COLOR_PALLETE from '../utils/ColorConstant';
import Button from './Button';
import Txt from './Txt';


const formSchema = z.object({
    price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    warranty: z.string().min(1, "Warranty is required").regex(/^\d+$/, "Warranty must be a number"),
    partUsed: z.string().min(1, "Part used is required"),
    quantity: z.string().min(1, "Quantity is required").regex(/^\d+$/, "Quantity must be a number")
})

const handleIssuePress = async () => {
  await SheetManager.show("issue-list-drawer")
}
const handleQualityPress = () => {
  console.log("Hello")
}
const IssuePricesForm = () => {
    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: '',
            warranty: '',
            partUsed: '',
            quantity: ''
        }
    });

    const onSubmit = (data: any) => {
        console.log(data)
        
    }
  return (
    <View className='p-5 bg-white mx-4 rounded-[10px] justify-center'>
      <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>Issue and Prices</Txt>
      <View className='w-full border border-[#E2E2E2] mt-[15px]' />
      <TouchableOpacity onPress={handleIssuePress}>
          <TextInput 
            label={"Issue"}
            mode={"outlined"}
            right={<TextInput.Icon icon={() => <AntDesign name="caretdown" size={10} color={COLOR_PALLETE.GRAY_65} />} />}
            editable={false}
            outlineColor={COLOR_PALLETE.OFF_WHITE_200}
            activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
            className='bg-white20 mt-[15px] text-sm text-gray65'
            pointerEvents={'none'}
            theme={{
              roundness: 8,
            }}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleQualityPress}>
          <TextInput 
            label={"Quality"}
            mode={"outlined"}
            right={<TextInput.Icon icon={() => <AntDesign name="caretdown" size={10} color={COLOR_PALLETE.GRAY_65} />} />}
            editable={false}
            outlineColor={COLOR_PALLETE.OFF_WHITE_200}
            activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
            className='bg-white20 mt-[15px] text-sm text-gray65'
            pointerEvents={'none'}
            theme={{
              roundness: 8,
            }}
          />
      </TouchableOpacity>
      <Controller 
        control={control}
        name="price"
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={"Price"}
              right={<TextInput.Affix textStyle={{color: "#A5A5A5"}} text='₹' />}
              mode={'outlined'}
              outlineColor={COLOR_PALLETE.OFF_WHITE_200}
              activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
              className='bg-white20 mt-[15px] text-sm text-gray65'
              theme={{
                  roundness: 8,
              }}
              error={!!errors.price}
            />
        )}
      />
      {errors.price && <Txt fontColor={"textDanger"}>{errors.price.message}</Txt>}
      <Controller 
        control={control}
        name='warranty'
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={"Warranty"}
              right={<TextInput.Affix textStyle={{color: "#A5A5A5"}} text='months' />}
              mode={'outlined'}
              outlineColor={COLOR_PALLETE.OFF_WHITE_200}
              activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
              className='bg-white20 mt-[15px] text-sm'
              theme={{
                  roundness: 8,
              }}
              error={!!errors.warranty}
            />
        )}
      />
      {errors.price && <Txt fontColor={"textDanger"}>{errors.warranty?.message}</Txt>}
      <Controller 
        control={control}
        name='partUsed'
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={"Part Used"}
              mode={'outlined'}
              outlineColor={COLOR_PALLETE.OFF_WHITE_200}
              activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
              className='bg-white20 mt-[15px] text-sm'
              theme={{
                  roundness: 8,
              }}
              error={!!errors.partUsed}
            />
        )}
      />
      {errors.partUsed && <Txt fontColor={"textDanger"}>{errors.partUsed?.message}</Txt>}
      <Controller 
        control={control}
        name='quantity'
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label={"Quantity"}
              mode={'outlined'}
              outlineColor={COLOR_PALLETE.OFF_WHITE_200}
              activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
              className='bg-white20 mt-[15px] text-sm'
              theme={{
                  roundness: 8,
              }}
              error={!!errors.quantity}
            />
        )}
      />
      {errors.quantity && <Txt fontColor={"textDanger"}>{errors.quantity?.message}</Txt>}
        <Button label={"Cancel"} marginTop={15} variant={"info"} />
        <Button label={"Save"} marginTop={15} onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default IssuePricesForm