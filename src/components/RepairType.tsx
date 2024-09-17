import React from 'react';
import { View, ImageSourcePropType } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { Txt } from '../components';

interface RepairTypeCardProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  borderColor?: string; 
  image: Source;
}

const RepairTypeCard: React.FC<RepairTypeCardProps> = ({ 
  title, 
  subtitle,
  backgroundColor = '#D5E7E8',
  borderColor = '#C9E3E8', 
  image 
}) => {
  return (
    <View style={{ backgroundColor, borderColor }} className='mt-[15px] w-full overflow-hidden h-[100px] relative rounded-[10px] border-[2px] border-[#C9E3E8]'>
      <View className='p-4 flex-row justify-between items-center'>
        <View>
          <Txt fontSize={"lg"} fontWeight={700} fontColor={"textDefault"}>{title}</Txt>
          <Txt fontSize={"base"} fontColor={"black60"} className='pt-[6px]'>{subtitle}</Txt>
        </View>
        <View className='w-[85px] h-[62px]'>
          <FastImage 
            source={image}
            className='w-full h-full'
          />
        </View>
      </View>
    </View>
  );
};

export default RepairTypeCard;