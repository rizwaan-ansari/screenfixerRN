import React, { FC, SVGProps } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ms } from 'react-native-size-matters'
import { SvgCallIcon } from '../assets/images'
import COLOR_PALETTE from '../utils/ColorConstant'
import Txt from './Txt'


interface ButtonProps {
    onPress?: () => void;
    label: string | string[];
    variant?: 'primary' | 'secondary' | 'info' | 'call';
    size?: 'base' | 'sm' | 'lg' | 'xl';
    weight?: 300 | 400 | 500 | 700;
    paddingVertical?: number;
    paddingHorizontal?: number;
    marginTop?: number;
    className?: string;
    icon?: 'call' | '';
    width?: number;
    flex?: number;
    marginLeft?: number;
    borderRadius?: number;
}

const Button = ({
    onPress,
    label,
    className,
    variant = 'primary',
    size = 'sm',
    weight = 700,
    marginTop,
    paddingVertical = ms(14, .25),
    paddingHorizontal = ms(16, .25),
    icon,
    width,
    flex,
    marginLeft,
    borderRadius,
}: ButtonProps) => {

    const getVariant = () => {
        switch (variant) {
            case "primary":
                return COLOR_PALETTE.BRAND;
            case "secondary":
                return COLOR_PALETTE.BLACK
            case "call":
                return COLOR_PALETTE.SUCCESS_16;
            case "info":
                return COLOR_PALETTE.OFF_WHITE;
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
        <TouchableOpacity onPress={onPress} style={{ marginLeft: marginLeft ,flex: flex ,width: width , backgroundColor: getVariant(), paddingVertical: paddingVertical, marginTop: marginTop, paddingHorizontal: paddingHorizontal, borderRadius: borderRadius }} className={`flex-row justify-center items-center ${className}`}>
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