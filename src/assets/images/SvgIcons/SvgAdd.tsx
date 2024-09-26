import React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                fill="#333"
                d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm0 1.6C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4 5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4Zm1.333 5.6v4.533h4.534v1.6h-4.534v4.534h-1.6v-4.534H7.2v-1.6h4.533V7.2h1.6Z"
            />
        </Svg>
    )
}
