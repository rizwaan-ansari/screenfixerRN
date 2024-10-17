import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={props.width ?? 20}
            height={props.height ?? 20}
            viewBox="0 0 32 32"
            fill={"white"}
            {...props}
        >
            <Path d="M7.219 5.781 5.78 7.22 14.563 16 5.78 24.781 7.22 26.22 16 17.437l8.781 8.782 1.438-1.438L17.437 16l8.782-8.781L24.78 5.78 16 14.563Z" />
        </Svg>
    )
}
