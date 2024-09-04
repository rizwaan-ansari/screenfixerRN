import React from 'react'
import { Text, TextStyle } from 'react-native';
import { ms } from 'react-native-size-matters';
import COLOR from '../utils/ColorConstant'


type fontSize =  "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
type fontColor =  "brand" | "brandDark" | "brandLight" | "textDefault" | "textDark" | "textSuccess" | "textDanger" | "textGreen" | "success16" | "white" | "white60" | "white700" | "neutral300" | "neutral400" | "neutral500" | "neutral700" | "neutral800" | "black" | "black40" | "black60" 
type fontWeight =  300 | 400 | 500 | 700;
type textAlign = "left" | "center" | "right";

interface TxtProps {
    fontSize?: fontSize,
    fontColor?: fontColor,
    fontWeight?: fontWeight
    textAlign?: textAlign
    style?: TextStyle | TextStyle[],
    className?: string
    numberOfLines?: number,
    children: React.ReactElement | string | string[]
}

const FONT_SIZE_MAPPER: Record<fontSize, { size: number, lineHeight: number }> = {
    'sm': {
        size: ms(12, 0.25),
        lineHeight: ms(14, 0.25),
    },
    'base': {
        size: ms(14, 0.25),
        lineHeight: ms(16.5, 0.25),
    },
    'lg': {
        size: ms(16, 0.25),
        lineHeight: ms(18.75, 0.25),
    },
    'xl': {
        size: ms(18, 0.25),
        lineHeight: ms(21, 0.25),
    },
    '2xl': {
        size: ms(20, 0.25),
        lineHeight: ms(23.5, 0.25),
    },
    '3xl': {
        size: ms(25, 0.25),
        lineHeight: ms(33.3, 0.25)
    },
    '4xl' : {
        size: ms(30, 0.25),
        lineHeight: ms(35, 0.25)
    }
}; 
const FONT_COLOR_MAPPER: Record<fontColor, string> = {
    'brand': COLOR.BRAND,
    'brandDark': COLOR.BRAND_DARK,
    'brandLight': COLOR.TEXT_BRAND_LIGHT,
    'textDefault': COLOR.TEXT_DEFAULT,
    'textDark': COLOR.TEXT_DARK,
    'textSuccess': COLOR.TEXT_SUCCESS,
    'textDanger': COLOR.TEXT_DANGER,
    'textGreen': COLOR.TEXT_GREEN,
    'success16': COLOR.SUCCESS_16,
    'white': COLOR.WHITE,
    'white60': COLOR.WHITE_60,
    'white700': COLOR.WHITE_700,
    'neutral300': COLOR.NEUTRAL_300,
    'neutral400': COLOR.NEUTRAL_400,
    'neutral500': COLOR.NEUTRAL_500,
    'neutral700': COLOR.NEUTRAL_700,
    'neutral800': COLOR.NEUTRAL_800,
    'black': COLOR.BLACK,
    'black40': COLOR.BLACK_40,
    'black60': COLOR.BLACK_60,
}; 
const FONT_WEIGHT_MAPPER: Record<fontWeight, string> = {
    300: "Roboto-Light",
    400: "Roboto-Regular",
    500: "Roboto-Medium",
    700: "Roboto-Bold",
};

export default function Txt({fontColor="textDefault", fontSize="base", fontWeight=400, textAlign= "left", numberOfLines, children, style, className}: TxtProps) {
    const styleProps = {
        fontFamily: FONT_WEIGHT_MAPPER[fontWeight], 
        fontSize: FONT_SIZE_MAPPER[fontSize].size,
        color: FONT_COLOR_MAPPER[fontColor], 
        fontWeight: fontWeight, 
        textAlign: textAlign, 
        lineHeight: FONT_SIZE_MAPPER[fontSize].lineHeight
    }
    return (
        <Text style={[styleProps, style]}  numberOfLines={numberOfLines} className={className}>
            {children}
        </Text>
    )
}

