import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { LOGIN_BANNER_IMG } from '../assets/images'
import { Txt } from '../components'
import { TextInput } from 'react-native-paper'
import COLOR_PALLETE from '../utils/ColorConstant'
import Button from '../components/Button'
import { useNavigation, NavigationProp } from '@react-navigation/native'


type Props = {
    navigation: NavigationProp<any>;
};

const LogInScreen = ({ navigation }:Props) => {
    const [text, setText] = useState("")
    const handlePress: () => void = () => {
        navigation.navigate("NavigationTabs");
    };

  return (
    <SafeAreaView>
        <View className='px-4 h-full'>
            <View className='w-[360px] h-[340px]'>
                <Image source={LOGIN_BANNER_IMG} />
            </View>
            <Txt fontSize={'3xl'} fontWeight={700} textAlign={'center'} fontColor={'textDark'} className='mt-[33px]'>
                Log Into Your Account
            </Txt>
            <Txt fontSize={'lg'} fontWeight={400} textAlign={'center'} fontColor={'neutral800'} className='mt-2'>
                Please enter your registered mobile number
            </Txt>
                <TextInput 
                    value={text}
                    left={<TextInput.Affix textStyle={{color: "black"}} text='+91' />}
                    mode='outlined'
                    onChangeText={(value) => setText(value)}
                    placeholder='Mobile Number'
                    activeOutlineColor={COLOR_PALLETE.TEXT_DEFAULT}
                    className='mt-[25px] bg-[#F5F5F5]'
                />
                <View className='mt-auto'>
                    <Button label={"Login"} onPress={handlePress} />
                </View>
        </View>
    </SafeAreaView>
  )
}

export default LogInScreen