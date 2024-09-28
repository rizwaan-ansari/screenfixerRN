import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Asset, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { TextInput } from 'react-native-paper'
import { SvgCross, SvgUpload } from '../assets/images'
import COLOR_PALLETE from '../utils/ColorConstant'
import Button from './Button'
import HorizontalSelect from './HorizontalSelect'
import Txt from './Txt'

const REPAIR_STATUS = [
    {
        id: 1,
        status: "Work-in-progress"
    },
    {
        id: 2,
        status: "Offsite Repair"
    },
    {
        id: 3,
        status: "Completed"
    },
]

const RepairAction = () => {

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Function to open the image picker
    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 0,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, response => {
            setIsLoading(false);
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const newImages = response.assets
                    .map((asset: Asset) => asset.uri)
                    .filter((uri): uri is string => uri !== undefined);

                setSelectedImages(prevImages => [...prevImages, ...newImages]);
                console.log('Selected Image URIs:', newImages);
            }
        });
    };

    const removeImage = (index: number) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index))
    }


    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
            <Txt fontWeight={700} fontSize={'xl'} className=''>Repair Action</Txt>
            <View className='border border-[#E2E2E2] mt-[15px]' />
            <View className='bg-white20 rounded-lg mt-[15px]'>
                <Txt className=' py-[17px] w-full pl-[15px]'>Repair Status</Txt>
            </View>
            <HorizontalSelect
                contentContainerStyle={{ flexDirection: 'row', marginTop: 15 }}
                multiple={false}
                options={REPAIR_STATUS.map((item) => { return { label: item.status, value: item.id } })}
            />
            <TouchableOpacity onPress={openImagePicker}>
                <View className='h-[210px] justify-center items-center bg-white20' style={{ borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 15, }}>
                    <SvgUpload />
                    <Txt fontSize={'sm'} textAlign={'center'} className='mt-[10px]'>Upload Image or Video</Txt>
                </View>
            </TouchableOpacity>
            <View className='w-full flex-row gap-x-2 flex-wrap'>
                {selectedImages.map((uri, index) => (
                    <View className='h-16 w-16 mt-[15px] relative' key={`${index}-uri`}>
                        <FastImage
                            source={{ uri: uri }}
                            className='w-full h-full rounded-md'
                        />
                        <TouchableOpacity className='absolute -top-2 -right-2' onPress={() => removeImage(index)}>
                            <SvgCross />
                        </TouchableOpacity>
                    </View>
                ))
                }
            </View>
            <TextInput
                mode={'outlined'}
                label={"Comment"}
                outlineColor={COLOR_PALLETE.OFF_WHITE_200}
                activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
                className='mt-[15px] bg-white20 text-sm text-gray65'
            />
            <Button label={"Update"} marginTop={15} />
        </View>
    )
}

export default RepairAction