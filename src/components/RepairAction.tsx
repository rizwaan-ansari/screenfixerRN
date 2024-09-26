import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Txt from './Txt'
import { TextInput } from 'react-native-paper'
import COLOR_PALLETE from '../utils/ColorConstant'
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { SvgUpload } from '../assets/images'

const RepairAction = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to open the image picker
  const openImagePicker = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const imageUri: string | null =  response.assets?.[0]?.uri ?? null;
        setSelectedImage(imageUri);
        console.log('Selected Image URI:', imageUri);
      }
    });
  };


    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
            <Txt fontWeight={700} fontSize={'xl'} className=''>Repair Action</Txt>
            <View className='border border-[#E2E2E2] mt-[15px]' />
            <TouchableOpacity onPress={openImagePicker}>
                <View className='h-[210px] justify-center items-center bg-white20' style={{ borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 15, }}>
                    <SvgUpload />
                    <Txt fontSize={'sm'} textAlign={'center'} className='mt-[10px]'>Upload Image or Video</Txt>
                </View>
            </TouchableOpacity>
            <TextInput
                mode={'outlined'}
                label={"Comment"}
                outlineColor={COLOR_PALLETE.OFF_WHITE_200}
                activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
                className='mt-[15px] bg-white20 text-sm text-gray65'
            />
        </View>
    )
}

export default RepairAction