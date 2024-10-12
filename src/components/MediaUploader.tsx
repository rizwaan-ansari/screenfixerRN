import React, { useContext, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ContextData } from '../providers/ContextProvider'

interface MediaUploaderProps {
    children?: React.ReactNode
    onSelected?: (params: { file: File, displayLoader: (display: boolean) => void, fileType: 'image' | 'video' }) => void,
    onRemoved?: (params: { index: string | number }) => void
}

const MediaUploader = ({ children, onSelected, onRemoved }: MediaUploaderProps) => {
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
            {children}
        </TouchableOpacity>
    )
}

export default MediaUploader