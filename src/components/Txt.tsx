import React from 'react'
import { Text, I18nManager, Platform } from 'react-native'
import { ms } from 'react-native-size-matters';
import COLOR from '../utils/ColorConstant'

type fontSize =  "sm" | "base" | "lg" | "xl" | "2xl"
type fontWeight =  300 | 400 | 500 | 700;

const FONT_SIZE_MAPPER: Record<fontSize, { size: number, lineHeight: number }> = {
    'sm': {
        size: 12,
        lineHeight: 14,
    },
    'base': {
        size: 14,
        lineHeight: 16.5,
    },
    'lg': {
        size: 16,
        lineHeight: 18.75,
    },
    'xl': {
        size: 18,
        lineHeight: 21,
    },
    '2xl': {
        size: 20,
        lineHeight: 23.5,
    },
}; 
const FONT_COLOR_MAPPER: Record<string, string> = {
    'brand': COLOR.BRAND,
    'brandDark': COLOR.BRAND_DARK,
    'brandLight': COLOR.BRAND_LIGHT,
    'textDefault': COLOR.TEXT_DEFAULT,
    'textSuccess': COLOR.TEXT_SUCCESS,
    'white': COLOR.WHITE,
    'black': COLOR.BLACK,
    'black40': COLOR.BLACK_40,
    'black60': COLOR.BLACK_60,
}; 

// const fontSize = (props) => {
//     if (props?.info) {
//         return ms(12, 0.25);
//     } else if (props?.paragraph) {
//         return I18nManager.isRTL ? ms(13, 0.25) : ms(14, 0.25);
//     } else if (props?.header) {
//         return I18nManager.isRTL ? ms(16, 0.25) : ms(18, 0.25);
//     } else if (props?.title) {
//         return I18nManager.isRTL ? ms(22, 0.25) : ms(24, 0.25);
//     } else {
//         return I18nManager.isRTL ? ms(13, 0.25) : ms(14, 0.25);
//     }
// }
// const lineHeight = (props) => {
//     arMultiplier =  1.4;
//     enMultiplier =  1.2;
//     if (props.info) {
//         return I18nManager.isRTL ? parseInt(0 + (ms(12, 0.25)  * arMultiplier)) : parseInt(0 + (ms(12, 0.25)  * enMultiplier));
//     } else if (props.paragraph) {
//         return I18nManager.isRTL ? parseInt(0 + (ms(13, 0.25)  * arMultiplier)) : parseInt(0 + (ms(14, 0.25)  * enMultiplier));
//     } else if (props.header) {
//         return I18nManager.isRTL ? parseInt(0 + (ms(16, 0.25)  * arMultiplier)) : parseInt(0 + (ms(18, 0.25)  * enMultiplier));
//     } else if (props.title) {
//         return I18nManager.isRTL ? parseInt(0 + (ms(22, 0.25)  * arMultiplier)) : parseInt(0 + (ms(24, 0.25)  * enMultiplier));
//     } else {
//         return I18nManager.isRTL ? parseInt(0 + (ms(13, 0.25)  * arMultiplier)) : parseInt(0 + (ms(14, 0.25)  * enMultiplier));
//     }
// }
// const fontWeight = (props) => {
//     if ('android' === Platform.OS) {
//         return '300';
//     }
//     if (props.thin) {
//         return '300'
//     } else if (props.regular) {
//         return '400';
//     } else if (props.medium) {
//         return '500';
//     } else if (props.semiBold) {
//         return '600';
//     } else if (props.bold) {
//         return '700';
//     } else {
//         return '400';
//     }
// }
// const fontColor = (props) => {
//     if (props.brand) {
//         return COLOR.BRAND;
//     } else if (props.brandLight) {
//         return COLOR.BRAND_60;
//     } else if (props.brand60) {
//         return COLOR.BRAND_LIGHT;
//     } else if (props.brandPurple) {
//         return COLOR.BRAND_PURPLE;
//     } else if (props.secondaryPurple) {
//         return COLOR.SECONDARY_PURPLE;
//     } else if (props.black) {
//         return COLOR.BLACK;
//     } else if (props.black60) {
//         return COLOR.BLACK_60;
//     } else if (props.black90) {
//         return COLOR.BLACK_90;
//     } else if (props.black80) {
//         return COLOR.BLACK_80;
//     } else if (props.black50) {
//         return COLOR.BLACK_50;
//     } else if (props.black30) {
//         return(COLOR.BLACK_30);
//     } else if (props.white) {
//         return COLOR.WHITE;
//     } else if (props.neutral50) {
//         return COLOR.NEUTRAL_50;
//     } else if (props.success) {
//         return COLOR.SUCCESS;
//     } else if (props.warning) {
//         return COLOR.WARNING;
//     } else if (props.danger) {
//         return COLOR.DANGER;
//     } else {
//         return COLOR.BLACK;
//     }
// }

// const fontFamily = (props) => {
//     let fontFamily = I18nManager.isRTL ? 'Cairo-Regular' : 'ProximaNova-Regular';
//     if (props.thin) {
//         fontFamily = I18nManager.isRTL ? ('android' === Platform.OS ? 'Cairo-Light' : 'Cairo-Regular') : 'ProximaNova-Regular';
//     } else if (props.regular) {
//         fontFamily = I18nManager.isRTL ? 'Cairo-Regular' : 'ProximaNova-Regular';
//     } else if (props.medium) {
//         fontFamily = I18nManager.isRTL ? 'Cairo-Regular' : 'ProximaNova-Regular';
//     } else if (props.semiBold) {
//         fontFamily = I18nManager.isRTL ? ('android' === Platform.OS ? 'Cairo-SemiBold' : 'Cairo-Regular') : 'ProximaNova-Regular';
//     } else if (props.bold) {
//         fontFamily = I18nManager.isRTL ? ('android' === Platform.OS ? 'Cairo-Bold' : 'Cairo-Regular') : 'ProximaNova-Regular';
//     } else {
//         fontFamily = I18nManager.isRTL ? 'Cairo-Regular' : 'ProximaNova-Regular';
//     }
//     return fontFamily;
// }

export default function Txt(props) {
    const { t } = useTranslation();
    return (
        <Text style={[{fontFamily: fontFamily(props), fontSize: fontSize(props), color: fontColor(props), fontWeight: fontWeight(props), textAlign: props.center ? 'center' : 'left', lineHeight: lineHeight(props)}, props.style]} onPress={props.onPress} numberOfLines={props?.numberOfLines}>
            {false === props?.translate ? props.children : t(props.children, props?.translationPlaeholder)}
        </Text>
    )
}

