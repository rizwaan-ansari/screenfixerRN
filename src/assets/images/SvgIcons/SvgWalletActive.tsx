import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgWallet(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 18}
            height={props?.height ?? 18}
            fill="none"
            {...props}
        >
            <Path
                fill="#63C7EC"
                fillRule="evenodd"
                d="M1 3a1 1 0 0 0-1 1v9.077a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1Zm10.077 5.539a1.23 1.23 0 1 0 2.461 0 1.23 1.23 0 0 0-2.461 0Z"
                clipRule="evenodd"
            />
            <Path
                fill="#63C7EC"
                d="M.937 2.001 1 2h12.976v-.078A1.923 1.923 0 0 0 11.692.034L1.563 1.763A1.92 1.92 0 0 0 .937 2Z"
            />
        </Svg>
    )
}
