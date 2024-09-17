import React from 'react';
import { View, ViewStyle, ImageSourcePropType } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { Txt } from '../components';

interface InfoCardProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  borderColor: string;
  image: Source;
  imageStyle: ViewStyle;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  subtitle, 
  backgroundColor, 
  borderColor, 
  image, 
  imageStyle 
}) => {
  return (
    <View style={{ backgroundColor, borderColor }} className='w-[174px] overflow-hidden h-[100px] relative rounded-[10px] border-[2px]'>
      <View className='p-4'>
        <Txt fontSize={"lg"} fontWeight={700} fontColor={"textDefault"}>{title}</Txt>
        <Txt fontSize={"base"} fontColor={"black60"} className='pt-[6px]'>{subtitle}</Txt>
        <View style={imageStyle} className='absolute'>
          <FastImage 
            source={image}
            className='w-full h-full'
          />
        </View>
      </View>
    </View>
  );
};

export default InfoCard;