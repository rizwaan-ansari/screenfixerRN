import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={props?.width ?? 18}
            height={props?.width ?? 18}
            fill="none"
            {...props}
        >
            <Path
                fill="#63C7EC"
                d="M7.385 12.313h1.23-1.23Zm3.695 0h1.23-1.23Zm-7.382 0h1.23-1.23Zm3.687-3.688h1.23-1.23Zm3.695 0h1.23-1.23Zm-7.382 0h1.23-1.23ZM.625 5.542h14.757H.625Zm2.465 9.833h9.827a2.465 2.465 0 0 0 2.465-2.466V4.32a2.465 2.465 0 0 0-2.465-2.465H3.09A2.465 2.465 0 0 0 .625 4.32v8.59a2.465 2.465 0 0 0 2.465 2.465Zm8.605-11.677V.625v3.073Zm-7.383 0V.625v3.073Z"
            />
            <Path
                stroke="#002E86"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="M7.385 12.313h1.23m2.465 0h1.229m-8.611 0h1.229m2.458-3.688h1.23m2.465 0h1.229m-8.611 0h1.229m6.767-4.927V.625M4.312 3.698V.625"
            />
            <Path
                fill="#63C7EC"
                d="M12.195 1.698v.5h-1v-.5h1Zm-1-1.073a.5.5 0 1 1 1 0h-1ZM4.812 1.698v.5h-1v-.5h1Zm-1-1.073a.5.5 0 0 1 1 0h-1Zm7.383 1.073V.625h1v1.073h-1Zm-7.383 0V.625h1v1.073h-1Z"
            />
        </Svg>
    )
}
