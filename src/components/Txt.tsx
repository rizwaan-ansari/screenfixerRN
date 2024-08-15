import React from 'react'
import { Text } from 'react-native'
import { ms } from 'react-native-size-matters';
import COLOR from '../utils/ColorConstant'


type fontSize =  "sm" | "base" | "lg" | "xl" | "2xl"
type fontColor =  "brand" | "brandDark" | "brandLight" | "textDefault" | "textSuccess" | "textDanger" | "success16" | "white" | "neutral700" | "black" | "black40" | "black60" 
type fontWeight =  300 | 400 | 500 | 700;
type textAlign = "left" | "center" | "right";

interface TxtProps {
    fontSize?: fontSize,
    fontColor?: fontColor,
    fontWeight?: fontWeight
    textAlign?: textAlign
    style?: object,
    numberOfLines?: number,
    children: React.ReactElement | string
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
}; 
const FONT_COLOR_MAPPER: Record<fontColor, string> = {
    'brand': COLOR.BRAND,
    'brandDark': COLOR.BRAND_DARK,
    'brandLight': COLOR.BRAND_LIGHT,
    'textDefault': COLOR.TEXT_DEFAULT,
    'textSuccess': COLOR.TEXT_SUCCESS,
    'textDanger': COLOR.TEXT_DANGER,
    'success16': COLOR.SUCCESS_16,
    'white': COLOR.WHITE,
    'neutral700': COLOR.NEUTRAL_700,
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

export default function Txt({fontColor="textDefault", fontSize="base", fontWeight=400, textAlign= "left", numberOfLines, children}: TxtProps) {
    return (
        <Text style={{fontFamily: FONT_WEIGHT_MAPPER[fontWeight], fontSize: FONT_SIZE_MAPPER[fontSize].size, color: FONT_COLOR_MAPPER[fontColor], fontWeight: fontWeight, textAlign: textAlign, lineHeight: FONT_SIZE_MAPPER[fontSize].lineHeight}}  numberOfLines={numberOfLines}>
            {children}
        </Text>
    )
}

