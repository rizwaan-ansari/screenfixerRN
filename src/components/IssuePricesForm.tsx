import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Txt from './Txt'
import { TextInput } from 'react-native-paper'
import COLOR_PALLETE from '../utils/ColorConstant'
import { useForm, Controller } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import Button from './Button'


const formSchema = z.object({
    price: z.string().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    warranty: z.string().min(1, "Warranty is required").regex(/^\d+$/, "Warranty must be a number"),
    partUsed: z.string().min(1, "Part used is required"),
    quantity: z.string().min(1, "Quantity is required").regex(/^\d+$/, "Quantity must be a number")
})

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
                  roundness: 10,
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
                  roundness: 10,
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
                  roundness: 10,
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
                  roundness: 10,
              }}
              error={!!errors.quantity}
            />
        )}
      />
      {errors.quantity && <Txt fontColor={"textDanger"}>{errors.quantity?.message}</Txt>}
      <View className='mt-[15px]'>
        <Button label={"Save"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

export default IssuePricesForm