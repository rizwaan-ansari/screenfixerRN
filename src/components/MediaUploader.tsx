import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Txt from './Txt'
import { SvgUpload } from '../assets/images'
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ContextData } from '../providers/ContextProvider'

const MediaUploader = () => {
    const { contextData, setContextData } = useContext(ContextData);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showImagePickerOption = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                {
                    text: "Take Photo",
                    onPress: openCamera,
                },
                {
                    text: "Choose from Gallery",
                    onPress: openImagePicker,
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        )
    }

    const openCamera = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            saveToPhotos: true,
            maxHeight: 2000,
            maxWidth: 2000
        }

        launchCamera(options, response => {
            setIsLoading(false);
            if (response.didCancel) {
                console.log("User cancelled camera");
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const newImages = response.assets
                    .map((asset: Asset) => asset.uri)
                    .filter((uri): uri is string => uri !== undefined)

                setContextData({
                    addImages: [...(contextData.addImages || []), ...newImages]
                })
            }
        })
    }

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

                setContextData({
                    addImages: [...(contextData.addImages || []), ...newImages]
                })
                console.log('Selected Image URIs:', newImages);
            }
        });
    };
    return (
        <TouchableOpacity onPress={showImagePickerOption}>
            <View className='h-[210px] justify-center items-center bg-white20' style={{ borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 15, }}>
                <SvgUpload />
                <Txt fontSize={'sm'} textAlign={'center'} className='mt-[10px]'>Upload Image or Video</Txt>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader