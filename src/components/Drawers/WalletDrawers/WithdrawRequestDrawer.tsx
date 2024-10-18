import { View } from 'react-native'
import React from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import Txt from '../../Txt'
import { TextInput } from 'react-native-paper'
import COLOR_PALETTE from '../../../utils/ColorConstant'
import Button from '../../Button'

const handlePress = async () => {
    await SheetManager.hide("withdraw-request-drawer");
    await SheetManager.show("withdraw-request-success-drawer");
}

const WithdrawalRequestDrawer = () => {
    const [text, setText] = React.useState("");
    return (
        <ActionSheet>
            <View className='px-4'>
                <Txt className='mt-4' fontColor={'textDefault'} fontSize={'xl'} fontWeight={700}>Withdrawal Request</Txt>
                <Txt className='pt-2' fontSize={'base'} fontColor={'neutral400'}>Transfer your wallet money into your bank account</Txt>
                <TextInput
                    value={text}
                    left={<TextInput.Icon size={16} color={COLOR_PALETTE.BRAND_LIGHT} icon={require('./../../../assets/images/rupee.png')} />}
                    mode="outlined"
                    onChangeText={text => setText(text)}
                    className='mt-3'
                />
                <View className='mt-3'>
                    <Button borderRadius={4} onPress={handlePress} label={'SUBMIT REQUEST'} />
                </View>
            </View>
        </ActionSheet>
    )
}

export default WithdrawalRequestDrawer