import React, { useState, useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgEdit, SvgPlay } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import Txt from './Txt';
import { z } from "zod";
import MediaLightBox from './MediaLightBox';

interface TechnicianCommentBoxProps {
    title: string;
    type?: string;
    description: string;
    hasEditIcon?: boolean;
}

interface MediaItem {
    url: string;
    type: 'image' | 'video';
}

const RepairActionSchema = z.object({
    status: z.object({
        id: z.string(),
        labeel: z.string()
    }).optional().nullable().refine((status) => { return !!status; }, {
        message: 'Please select the status'
    }),
    files: z.array(
        z.object({
            type: z.string(),
            mime_type: z.string(),
            url: z.string(),
            files: z.any()
        })
    ).min(1, { message: 'Please upload at least one image/video' })
});

const TechnicianCommentBox = ({ title, type, description, hasEditIcon }: TechnicianCommentBoxProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const item: any = contextData.repairRequestItem;

    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const isVideo = (url: string) => {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext));
    };

    const fileBaseUrl = type === "before_repair_comment"
        ? item?.before_repair_comment.files_base_url
        : item?.after_repair_comment.files_base_url;

    const files = type === "before_repair_comment"
        ? item?.before_repair_comment.files
        : item?.after_repair_comment.files;

    const mediaItems: MediaItem[] = files?.map((file: any) => ({
        url: `${fileBaseUrl}${file.files.file}`,
        type: isVideo(`${fileBaseUrl}${file.files.file}`) ? 'video' : 'image'
    })) || [];

    const handleMediaPress = (index: number) => {
        setActiveIndex(index);
        setIsVisible(true);
    };

    const renderThumbnail = (mediaItem: MediaItem, index: number) => {
        return (
            <TouchableOpacity 
                key={`media-${index}`}
                className='h-16 w-16 mt-[15px] relative bg-[#E2E2E2] rounded-md'
                onPress={() => handleMediaPress(index)}
            >
                <FastImage
                    source={{ uri: mediaItem.url }}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 6,
                        position: "relative"
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {mediaItem.type === 'video' && (
                    <View className='absolute top-[30%] left-[30%]'>
                        <SvgPlay />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const commentText = type === "before_repair_comment" 
        ? item?.before_repair_comment?.comment
        : item?.after_repair_comment?.comment;

    return (
        <View className='p-5 bg-white mx-4 rounded-[10px] justify-center mt-5'>
            <View className='flex-row justify-between'>
                <Txt fontWeight={700} fontSize={"xl"} fontColor={"brandDark"}>{title}</Txt>
                {hasEditIcon && (
                    <TouchableOpacity
                        className='w-5 h-5'
                        onPress={() => setContextData({ editBeforeRepair: true })}
                    >
                        <SvgEdit />
                    </TouchableOpacity>
                )}
            </View>

            <Txt className='pt-[10px]' fontSize={"base"} fontColor={'black60'}>{description}</Txt>

            {commentText && (
                <Txt fontSize={"sm"} fontColor={"neutral300"} className='pt-[10px]'>
                    {commentText}
                </Txt>
            )}

            <View className='w-full flex-row flex-wrap gap-x-2'>
                {mediaItems.map((mediaItem, index) => renderThumbnail(mediaItem, index))}
            </View>

            <MediaLightBox 
                mediaItems={mediaItems}
                visible={isVisible}
                initialIndex={activeIndex}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    );
};

export default TechnicianCommentBox;