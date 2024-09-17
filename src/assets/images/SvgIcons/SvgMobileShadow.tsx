import React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg width={84} height={82} {...props}>
        <Path fillOpacity={0.05} d="m0 65.815 16 16h67.093V36.683L46.41 0z" />
      </Svg>
    )
}
