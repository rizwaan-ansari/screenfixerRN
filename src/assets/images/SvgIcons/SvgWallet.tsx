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
                fill="#fff"
                fillRule="evenodd"
                d="M.5 5.076a1.5 1.5 0 0 1 1.5-1.5h14a1.5 1.5 0 0 1 1.5 1.5v9.077a1.5 1.5 0 0 1-1.5 1.5H2a1.5 1.5 0 0 1-1.5-1.5V5.076Zm1.5-.5a.5.5 0 0 0-.5.5v9.077a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V5.076a.5.5 0 0 0-.5-.5H2Z"
                clipRule="evenodd"
            />
            <Path
                fill="#fff"
                fillRule="evenodd"
                d="M12.604.542a2.423 2.423 0 0 1 2.871 2.38v1.154h-1V2.923a1.423 1.423 0 0 0-1.69-1.398l-.009.002L2.652 3.255c-.669.13-1.152.716-1.152 1.398v1.885h-1V4.653c0-1.163.826-2.163 1.97-2.381l.009-.002L12.604.542Z"
                clipRule="evenodd"
            />
            <Path
                fill="#fff"
                d="M13.307 10.846a1.23 1.23 0 1 1 0-2.462 1.23 1.23 0 0 1 0 2.462Z"
            />
        </Svg>
    )
}
