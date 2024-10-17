import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import Video from 'react-native-video';
import { SvgClose } from '../assets/images';

interface MediaItem {
    url: string;
    type: 'image' | 'video';
}

interface MediaLightBoxProps {
    mediaItems: MediaItem[];
    visible: boolean;
    initialIndex: number;
    onRequestClose: () => void;
}

const MediaLightBox = ({ mediaItems, visible, initialIndex, onRequestClose }: MediaLightBoxProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (visible && initialIndex >= 0 && initialIndex < mediaItems.length) {
            setCurrentIndex(initialIndex);
        }
    }, [initialIndex, visible, mediaItems]);

    if (!mediaItems?.length) {
        return null;
    }

    const images = mediaItems
        .filter(item => item.type === 'image')
        .map(item => ({ uri: item.url }));

    const currentItem = mediaItems[currentIndex];

    if (!currentItem) {
        onRequestClose();
        return null;
    }

    if (currentItem.type === 'image') {
        const imageIndex = images.findIndex(img => img.uri === currentItem.url);
        return (
            <ImageView
                images={images}
                imageIndex={imageIndex >= 0 ? imageIndex : 0}
                visible={visible}
                onRequestClose={onRequestClose}
            />
        );
    }

    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType="fade"
            onRequestClose={onRequestClose}
            style={{backgroundColor: "#000"}}
        >
            <SafeAreaView className="flex-1 bg-[#000]">
                <TouchableOpacity
                    className="absolute top-10 right-0 z-10 p-4"
                    onPress={onRequestClose}
                >
                    <View className="w-[50px] h-[50px] items-center justify-center rounded-full">
                        <SvgClose />
                    </View>
                </TouchableOpacity>

                <View className="flex-1 justify-center">
                    {currentItem.url ? (
                        <Video
                            source={{ uri: currentItem.url }}
                            style={{
                                width: Dimensions.get('window').width,
                                height: 300
                            }}
                            resizeMode="contain"
                            controls={true}
                            repeat={true}
                            onError={(error) => {
                                console.warn('Video playback error:', error);
                            }}
                        />
                    ) : (
                        <View className="items-center justify-center">
                            <Text className="text-white">Unable to load video</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default MediaLightBox;