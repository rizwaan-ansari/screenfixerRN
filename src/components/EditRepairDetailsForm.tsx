import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Txt from './Txt'
import { TextInput } from 'react-native-paper'
import COLOR_PALLETE from '../utils/ColorConstant'
import Button from './Button'
import { ContextData } from '../providers/ContextProvider'

const EditRepairDetailsForm = () => {
    const { contextData, setContextData } = useContext(ContextData);
    
  return (
    <View className='p-5 my-[15px] bg-white mx-4 rounded-[10px] justify-center'>
      <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"} textAlign={"center"}>Edit Repair Details</Txt>
      <View className='w-full border border-[#E2E2E2] mt-[15px]' />
      <TextInput  
        label={"IMEI number"}
        mode={"outlined"}
        outlineColor={COLOR_PALLETE.OFF_WHITE_200}
        activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
        className='bg-white20 mt-[15px] text-sm text-gray65'
        theme={{
            roundness: 8,
        }}
      />
      <View className='w-full border border-[#E2E2E2] mt-[15px]' />
        <Button marginTop={15} label={"Cancel"} variant={"info"} onPress={() => setContextData({ editIMEINumber: false})} />
        <Button marginTop={15} label={"Update"} />
    </View>
  )
}

export default EditRepairDetailsForm