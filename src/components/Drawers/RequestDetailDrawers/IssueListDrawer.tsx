import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

import ISSUESLIST from '../../../data/issues-list.json';
import Button from '../../Button';
import Txt from '../../Txt';


const IssueListDrawer = () => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>();
    const { height } = Dimensions.get('window');
    const cardColors = ["#FCE7E6", "#D5E7E8", "#E7D5E6", "#DEF1FF"];
    const [shuffledColors, setShuffledColors] = useState<string[]>([]);
    
    const randomizeColors = () => {
        let colors = [...cardColors];
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors;
    };

    const handlePress = (index: number) => {
        setSelectedIndex(prevIndex => (prevIndex === index ? null : index))
    }

    useEffect(() => {
        setShuffledColors(randomizeColors());
    }, []);
  return (
    <ActionSheet containerStyle={{ height: height * 0.7, padding: 16}} gestureEnabled={true}>
            <ScrollView className='h-full' showsVerticalScrollIndicator={false}>
                <View className='flex-row flex-wrap'>
                    {ISSUESLIST.map((issue, index) => (
                        <TouchableOpacity key={`issueDrawer-${index}`} className='mt-1 w-1/3 items-center' onPress={() => handlePress(index)}>
                                <View className={`relative w-[90px] rounded-[10px] h-[90px] mt-2 ${selectedIndex === index ? 'border border-black' : ''}`} style={{backgroundColor: shuffledColors[index % shuffledColors.length]}}>
                                    {selectedIndex === index ? 
                                        <View className='absolute -right-1 -top-1 rounded-full' style={{backgroundColor: shuffledColors[index % shuffledColors.length]}}>
                                            <AntDesign name={"checkcircleo"} size={24} />
                                        </View>
                                        :
                                        ''
                                    }
                                    {issue.icon ? 
                                        <FastImage
                                            source={{uri: issue.icon as string}}
                                            className='w-full h-full'
                                        />
                                        :
                                        <FastImage
                                            source={{uri: "https://i.ibb.co/rHCvx4g/issue-placeholder.png"}}
                                            className='w-full h-full'
                                        />
                                    }
                                </View>
                                <Txt fontSize={'base'} fontWeight={500} fontColor={"neutral300"} className='text-balance text-center max-w-[6.25rem] pt-2'>{issue.description}</Txt>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Button label={"Add"} />
    </ActionSheet>
  )
}

export default IssueListDrawer