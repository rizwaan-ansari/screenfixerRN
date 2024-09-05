import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Txt from './Txt'
import { ms } from 'react-native-size-matters'
import COLOR_PALLETE from '../utils/ColorConstant'


interface ButtonProps {
    onPress?: () => void,
    label: string | string[],
    variant?: 'primary' | 'secondary' | 'info',
    size?: 'base' | 'sm' | 'lg' | 'xl',
    weight?: 300 | 400 | 500 | 700,
    paddingVertical?: number,
    paddingHorizontal?: number,
    className?: string
}

const Button = ({ 
    onPress, 
    label, 
    className, 
    variant = 'primary', 
    size = 'sm', 
    weight = 700, 
    paddingVertical= ms(14, .25), 
    paddingHorizontal= ms(16, .25)
    }: ButtonProps) => {

    const getVariant = () => {
        if(variant === 'primary') {
            return COLOR_PALLETE.BRAND
        } else if(variant === 'secondary') {
            return COLOR_PALLETE.BLACK
        } else if(variant === 'info') {
            return COLOR_PALLETE.OFF_WHITE
        }
    }

    const getTextColor = () => {
        if(variant === 'primary') {
            return 'white'
        } else if (variant === 'info') {
            return 'black60'
        }
    }

    const getFontSize = () => {
        if (size === 'xl') {
            return 'xl';
        } else if (size === 'lg') {
            return 'lg';
        } else if (size === 'base') {
            return 'base';
        }
    }

    const getFontWeight = () => {
        if (weight === 300) {
            return 300;
        } else if (weight === 400) {
            return 400;
        } else if (weight === 500) {
            return 500;
        } else if (weight === 700) {
            return 700;
        }
    } 


    return (
        <TouchableOpacity onPress={onPress} style={{backgroundColor: getVariant(), paddingVertical: paddingVertical, paddingHorizontal: paddingHorizontal, borderRadius: ms(4, .25)}} className={className}>
            <Txt fontSize={getFontSize()} fontWeight={getFontWeight()} textAlign='center' fontColor={getTextColor()}>
                {label}
            </Txt>
        </TouchableOpacity>
    )
}

export default Button