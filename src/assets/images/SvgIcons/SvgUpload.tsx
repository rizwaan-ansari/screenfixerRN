import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
        width={props?.width ?? 26}
        height={props?.height ?? 26}
        fill="none"
        {...props}
      >
        <Path stroke="#A5A5A5" d="M13 0v26M0 13h26" />
      </Svg>
    )
}
