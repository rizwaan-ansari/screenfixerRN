import React from "react"
import Svg, { SvgProps, Circle, Mask, G } from "react-native-svg"

export default function SvgProfile(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 18}
            height={props?.height ?? 18}
            fill="none"
            {...props}
        >
            <Circle cx={8.25} cy={8} r={7.5} stroke="#fff" />
            <Mask
                id="a"
                width={props?.width ?? 18}
                height={props?.height ?? 18}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
                style={{
                    maskType: "alpha",
                }}
            >
                <Circle cx={8.25} cy={8} r={8} fill="#D9D9D9" />
            </Mask>
            <G mask="url(#a)">
                <Circle cx={8.304} cy={15.18} r={5.026} stroke="#fff" />
            </G>
            <Circle cx={8.25} cy={7.077} r={3.077} stroke="#fff" />
        </Svg>
    )
}
