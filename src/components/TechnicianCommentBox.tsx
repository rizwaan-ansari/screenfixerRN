import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgEdit } from '../assets/images';
import { ContextData } from '../providers/ContextProvider';
import Txt from './Txt';
import Lightbox from 'react-native-lightbox-v2';
import Video from "react-native-video"
import { z } from "zod";

interface TechnicianCommentBoxProps {
    title: string;
    type?: string;
    description: string;
    hasEditIcon?: boolean;
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
})

const TechnicianCommentBox = ({ title, type, description, hasEditIcon }: TechnicianCommentBoxProps) => {
    const { contextData, setContextData } = useContext(ContextData);
    const item: any = contextData.repairRequestItem;

    const isVideo = (url: string) => {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext));
    };
    const renderMedia = (imageUrl: string) => (
        isVideo(imageUrl) ? (
            <View className='w-full h-full'>
                <Video
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                    controls={true}
                    repeat={true}
                    className="w-full h-full object-cover"
                />
            </View>
        ) : (
            <View className='w-20 h-20'>
                <FastImage
                    source={{ uri: imageUrl }}
                    className="w-full h-full object-contain"
                />
            </View>
        )
    );

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

            {item?.before_repair_comment?.comment && (
                <Txt fontSize={"sm"} fontColor={"neutral300"} className='pt-[10px]'>
                    {item?.before_repair_comment.comment}
                </Txt>
            )}

            <View className='w-full flex-row flex-wrap gap-x-2'>
                {type === "before_repair_comment" ? (
                    item?.before_repair_comment.files.map((image: any, imgIndex: number) => {
                        const imageUrl = `${item?.before_repair_comment.files_base_url}${image.files.file}`;
                        return (
                            <View key={`beforeImage--${imgIndex}`} className='h-16 w-16 mt-[15px] relative bg-[#E2E2E2] rounded-md'>
                                {/*@ts-expect-error*/}
                                <Lightbox
                                    style={{ width: 64, height: 64 }}
                                    renderContent={() => renderMedia(imageUrl)}
                                >
                                    <FastImage
                                        source={{ uri: imageUrl }}
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 6
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </Lightbox>
                            </View>
                        );
                    })
                ) : (
                    item?.after_repair_comment.files.map((image: any, imgIndex: number) => {
                        const imageUrl = `${item?.after_repair_comment.files_base_url}${image.files.file}`;
                        return (
                            <View key={`afterImage--${imgIndex}`} className='h-16 w-16 mt-[15px] relative bg-[#E2E2E2] rounded-md'>
                                {/*@ts-expect-error*/}
                                <Lightbox
                                    style={{ width: 64, height: 64 }}
                                    renderContent={() => renderMedia(imageUrl)}
                                >
                                    <FastImage
                                        source={{ uri: imageUrl }}
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 6
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </Lightbox>
                            </View>
                        );
                    })
                )}
            </View>
        </View>
    );
};

export default TechnicianCommentBox;