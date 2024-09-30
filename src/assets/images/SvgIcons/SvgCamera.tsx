import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 24}
            height={props?.height ?? 24}
            {...props}
        >
            <Path
                fill="#A5A5A5"
                fillRule="evenodd"
                d="m15 3 2 3h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6Zm-3 4.99c-2.76 0-5 2.24-5 5.01 0 2.77 2.24 5.01 5 5.01s5-2.24 5-5.01c0-2.77-2.24-5.01-5-5.01Zm0 2.02c1.66 0 3 1.341 3 2.99 0 1.649-1.34 2.99-3 2.99S9 14.649 9 13c0-1.649 1.34-2.99 3-2.99Z"
            />
        </Svg>
    )
}
