import React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={22}
            height={23}
            fill="none"
            {...props}
        >
            <Circle
                cx={11}
                cy={11.74}
                r={10}
                fill="#D9534F"
                stroke="#fff"
                strokeWidth={2}
            />
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8 8.74 5.898 5.898M13.898 8.74 8 14.638"
            />
        </Svg>
    )
}
