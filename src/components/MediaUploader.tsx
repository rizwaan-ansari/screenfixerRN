import React, { useContext, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { ContextData } from '../providers/ContextProvider'

interface MediaItem {
    type: 'image' | 'video';
    mime_type: string;
    url: string;
    thumbnail?: string;
    files?: any;
}

interface MediaUploaderProps {
    items?: MediaItem[];
    onSelected?: (params: { file: Asset, displayLoader: (display: boolean) => void, fileType: 'image' | 'video' }) => void;
    onRemoved?: (params: { index: number }) => void;
    children?: React.ReactNode;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({  onSelected, children }) => {
    const { contextData, setContextData } = useContext(ContextData);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showImagePickerOption = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                { text: "Take Photo", onPress: openCamera },
                { text: "Choose from Gallery", onPress: openImagePicker },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    const openCamera = () => {
        launchCamera({ mediaType: 'photo', maxHeight: 2000, maxWidth: 2000 }, handleResponse);
    };

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0, maxHeight: 2000, maxWidth: 2000 }, handleResponse);
    };

    const handleResponse = (response: any) => {
        if (response.didCancel) {
            console.log("User cancelled image picker");
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            response.assets.forEach((asset: Asset) => {
                const fileType = asset.type?.startsWith('image/') ? 'image' : 'video';
                onSelected && onSelected({
                    file: asset,
                    displayLoader: setIsLoading,
                    fileType: fileType
                });
            });
        }
    };
    return (
        <TouchableOpacity onPress={showImagePickerOption}>
            {children}
        </TouchableOpacity>
    )
}

export default MediaUploader