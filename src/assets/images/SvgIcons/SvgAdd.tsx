import React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={22}
            height={21}
            fill="none"
            {...props}
        >
            <Circle cx={10.5} cy={10.5} r={10.5} stroke="#333" strokeWidth={1.5} />
            <Path stroke="#333" strokeWidth={1.5} d="M11 6v10M6 11h10" />
        </Svg>
    )
}
