import { TouchableOpacity } from 'react-native'
import React from 'react'
import Txt from './Txt'

interface ButtonProps {
    onPress?: () => void,
    label: string | string[],
}

const Button = ({ onPress, label, ...props}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={`py-4 bg-brand rounded-lg`}>
        <Txt fontSize='sm' fontWeight={700} textAlign='center' fontColor={'white'}>
            {label}
        </Txt>
    </TouchableOpacity>
  )
}

export default Button