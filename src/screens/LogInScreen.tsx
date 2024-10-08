import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { z } from 'zod';

import { LOGIN_BANNER_IMG } from '../assets/images';
import { Txt } from '../components';
import Button from '../components/Button';
import COLOR_PALETTE from '../utils/ColorConstant';

const formSchema = z.object({
    mobileNumber: z.string().min(1, "Mobile Number is required").regex(/^\d{10}$/, "Mobile Number must be 10 digits long")
})

type Props = {
    navigation: NavigationProp<any>;
};

const LogInScreen = ({ navigation }: Props) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mobileNumber: ''
        }
    })

    const handlePress = (data: any) => {
        navigation.navigate("NavigationTabs");
        console.log(data)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
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
                        <Controller
                            control={control}
                            name='mobileNumber'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    label={"Mobile Number"}
                                    left={<TextInput.Affix textStyle={{ color: "black" }} text='+91' />}
                                    mode='outlined'
                                    placeholder='Mobile Number'
                                    activeOutlineColor={COLOR_PALETTE.TEXT_DEFAULT}
                                    className='mt-[25px] bg-[#F5F5F5]'
                                    error={!!errors.mobileNumber}
                                />
                            )}
                        />
                        {errors.mobileNumber && <Txt className='pt-1' fontColor={"textDanger"}>{errors.mobileNumber?.message}</Txt>}
                        <View className='mt-auto pt-[15px]'>
                            <Button size={'xl'} weight={400} label={"Login"} onPress={handleSubmit(handlePress)} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LogInScreen;