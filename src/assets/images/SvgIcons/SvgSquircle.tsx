import React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={props.width ?? 38}
            height={props.height ?? 38}
            fill="#002E86"
            {...props}
        >
            <Path
                fill="#002E86"
                d="M0 19C0 4.75 4.75 0 19 0s19 4.75 19 19-4.75 19-19 19S0 33.25 0 19"
            />
        </Svg>
    )
}
