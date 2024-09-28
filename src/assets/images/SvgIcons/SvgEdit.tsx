import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 24}
            height={props?.height ?? 24}
            fill="#000"
            {...props}
        >
            <Path
                stroke="#000"
                d="M11.597.805a1.56 1.56 0 0 1 0 3.121H3.791c-.37 0-.67.3-.67.67V20.21c0 .37.3.67.67.67h15.613c.37 0 .67-.3.67-.67v-7.806a1.56 1.56 0 1 1 3.12 0v7.806A3.791 3.791 0 0 1 19.405 24H3.79A3.791 3.791 0 0 1 0 20.209V4.596A3.791 3.791 0 0 1 3.791.806h7.806Zm11.71-.112a2.366 2.366 0 0 1 0 3.346L12.713 14.633l-4.461 1.115 1.115-4.46L19.961.692a2.366 2.366 0 0 1 3.346 0Z" />
        </Svg>
    )
}
