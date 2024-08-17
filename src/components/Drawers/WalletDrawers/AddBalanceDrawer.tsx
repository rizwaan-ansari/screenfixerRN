import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { TextInput } from 'react-native-paper';
import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { RUPEE } from './../../../assets/images/index'
import COLOR_PALLETE from '../../../utils/ColorConstant';
import Txt from '../../Txt';
import Button from '../../Button';

const BALANCE_OPTIONS = [
    { id: 0, balance: 300 },
    { id: 1, balance: 500 },
    { id: 2, balance: 1000 },
    { id: 3, balance: 2000 }
];
interface BalanceOptionsProps {
    id: number,
    balance: number
}

const BalancePills = ({ item }: { item: BalanceOptionsProps }) => {
    return (
        <TouchableOpacity className='px-5 py-[10px] bg-white20 rounded-lg mt-3 mr-[10px] flex-1 min-w-[50px] max-w-[120px]'>
            <Txt textAlign='center'>
                ₹{item.balance.toString()}
            </Txt>
        </TouchableOpacity>
    )
}

const handlePress = async () => {
    await SheetManager.hide("add-balance-drawer");
    await SheetManager.show("balance-success-drawer");
}

const AddBalanceDrawer = () => {
    const [text, setText] = React.useState("");
    return (
        <ActionSheet>
            <View className='px-4 py-4'>
                <Txt fontSize={'xl'} fontWeight={700}>Add Balance</Txt>
                <Txt fontSize={'sm'} fontWeight={400} fontColor={'neutral400'} className='pt-2'>Enter the amount you want to add in your wallet</Txt>
                <TextInput
                    value={text}
                    left={<TextInput.Icon size={16} color={COLOR_PALLETE.BRAND_LIGHT} icon={require('./../../../assets/images/rupee.png')} />}
                    mode="outlined"
                    onChangeText={text => setText(text)}
                    className='mt-3'
                />
                <View className='w-full py-2 flex flex-row flex-wrap'>
                    {BALANCE_OPTIONS.map((item) => {
                        return (
                            <BalancePills key={item.id} item={item} />
                        );
                    })}
                </View>
                <View className='mt-3'>
                    <Button onPress={handlePress} label={"CONTINUE"} />
                </View>
            </View>
        </ActionSheet>
    )
}

export default AddBalanceDrawer