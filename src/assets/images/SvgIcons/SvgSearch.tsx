import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


export default function SvgSearch(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 18}
            height={props?.height ?? 18}
            fill="none"
            {...props}
        >
            <Path
                fill="#fff"
                fillRule="evenodd"
                d="M1.283 7.137a6.137 6.137 0 1 1 10.537 4.278.51.51 0 0 0-.122.122 6.137 6.137 0 0 1-10.415-4.4Zm10.818 5.388a7.137 7.137 0 1 1 .707-.707l3.262 3.262a.5.5 0 1 1-.707.707l-3.262-3.262Z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
