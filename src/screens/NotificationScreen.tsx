import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { Txt } from '../components'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface NotificationProps {
  id: number;
  title: string;
  description: string;
  date: string;
}

const DATA: NotificationProps[] = [
  {
    id: 1,
    title: "Notification Title",
    description: "You have an appointment with Dr. Arthur Shelby in 60mins",
    date: "12 March, 2020"
  },
  {
    id: 2,
    title: "Notification Title",
    description: "You have an appointment with Dr. Arthur Shelby in 60mins",
    date: "12 March, 2020"
  },
  {
    id: 3,
    title: "Notification Title",
    description: "You have an appointment with Dr. Arthur Shelby in 60mins",
    date: "12 March, 2020"
  },
  {
    id: 4,
    title: "Notification Title",
    description: "You have an appointment with Dr. Arthur Shelby in 60mins",
    date: "12 March, 2020"
  },
  {
    id: 5,
    title: "Notification Title",
    description: "You have an appointment with Dr. Arthur Shelby in 60mins",
    date: "12 March, 2020"
  },
]

const renderItem = ({ item }: { item: NotificationProps }) => {
  return (
    <View className='bg-[#F6F6F6] m-[15px] rounded-[10px]'>
      <View className='px-[14px] py-[10px]'>
        <Txt fontSize={'sm'} fontWeight={500}>{item.title}</Txt>
        <Txt className='pt-[10px]' fontSize={"base"} fontWeight={500} fontColor={"textDefault"}>{item.description}</Txt>
        <Txt fontSize={"sm"} fontWeight={500} fontColor={"textDefault60"} className='pt-[15px]'>{item.date}</Txt>
      </View>
    </View>
  )
}

const NotificationScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView className='relative'>
      <View className='px-4 py-4 bg-white20'>
        <View className='flex-row items-center justify-center relative'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='w-[22px] h-[22px] absolute left-0 top-0 rounded-full border border-[#A5A5A5] flex justify-center items-center'>
            <Txt>
              <FeatherIcon name="chevron-left" className='w-[5px] h-2' color={"#A5A5A5"} />
            </Txt>
          </TouchableOpacity>
          <Txt fontWeight={700} fontSize={"xl"} fontColor={"textDefault"}>Notifications</Txt>
        </View>
        <LinearGradient
          colors={['#FFFFFF', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200, zIndex: 50 }}
        />
        <View className='h-full bg-white mt-5 rounded-tl-[15px] rounded-tr-[15px]'>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen