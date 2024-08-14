import React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export default function SvgProfile(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 18}
            height={props?.height ?? 18}
            fill="none"
            {...props}
        >
            <Circle cx={9.25} cy={9} r={8} stroke="#63C7EC" />
            <Path
                fill="#63C7EC"
                fillRule="evenodd"
                d="M9.705 16.987a8 8 0 1 0-5.68-1.928 5.462 5.462 0 0 1 10.536-.077 7.967 7.967 0 0 1-4.856 2.005Zm2.622-9.91a3.077 3.077 0 1 1-6.154 0 3.077 3.077 0 0 1 6.154 0Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
