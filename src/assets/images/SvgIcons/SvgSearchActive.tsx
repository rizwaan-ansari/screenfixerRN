import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


export default function SvgSearch(props: SvgProps) {
    return (
        <Svg
            width={19}
            height={18}
            fill="none"
            {...props}
        >
            <Path
            fill="#63C7EC"
            fillRule="evenodd"
            d="M3.283 8.137a5.137 5.137 0 1 1 8.865 3.534 1.54 1.54 0 0 0-.194.194 5.137 5.137 0 0 1-8.671-3.728Zm9.732 6.716a8.137 8.137 0 1 1 2.121-2.121l2.641 2.64a1.5 1.5 0 1 1-2.121 2.122l-2.64-2.64Z"
            clipRule="evenodd"
            />
        </Svg>
    )
}
