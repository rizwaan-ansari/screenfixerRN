import React, { FC, SVGProps } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { SvgCallIcon } from '../assets/images'
import COLOR_PALLETE from '../utils/ColorConstant'
import Txt from './Txt'


interface ButtonProps {
    onPress?: () => void;
    label: string | string[];
    variant?: 'primary' | 'secondary' | 'info' | 'call';
    size?: 'base' | 'sm' | 'lg' | 'xl';
    weight?: 300 | 400 | 500 | 700;
    paddingVertical?: number;
    paddingHorizontal?: number;
    className?: string;
    icon?: 'call' | '';
}

const Button = ({
    onPress,
    label,
    className,
    variant = 'primary',
    size = 'sm',
    weight = 700,
    paddingVertical = ms(14, .25),
    paddingHorizontal = ms(16, .25),
    icon
}: ButtonProps) => {

    const getVariant = () => {
        switch (variant) {
            case "primary":
                return COLOR_PALLETE.BRAND;
            case "secondary":
                return COLOR_PALLETE.BLACK
            case "call":
                return COLOR_PALLETE.SUCCESS_16;
            case "info":
                return COLOR_PALLETE.OFF_WHITE;
        }
    }

    const getIcon = () => {
        switch (icon) {
            case "call":
                return <SvgCallIcon />
        }
    }
    const getTextColor = () => {
        if (variant === 'primary') {
            return 'white'
        } else if (variant === 'info') {
            return 'black60'
        } else if (variant === 'call') {
            return 'textSuccess'
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
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: getVariant(), paddingVertical: paddingVertical, paddingHorizontal: paddingHorizontal, borderRadius: ms(4, .25) }} className={`flex-row justify-center items-center ${className}`}>
            {
                icon ? (
                    <View className='pr-2 flex justify-center items-center'>
                        {getIcon()}
                    </View>
                ) : null
            }
            <Txt fontSize={getFontSize()} fontWeight={getFontWeight()} textAlign='center' fontColor={getTextColor()}>
                {label}
            </Txt>
        </TouchableOpacity>
    )
}

export default Button