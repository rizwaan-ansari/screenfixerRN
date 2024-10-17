import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            // xmlSpace="preserve"
            width={props.width ?? 24}
            height={props.height ?? 24}
            // style={{
            //     enableBackground: "new 0 0 24 24",
            // }}
            viewBox="0 0 30.051 30.051"
            {...props}
        >
            <Path
                d="m19.982 14.438-6.24-4.536a.752.752 0 0 0-1.195.607v9.069a.75.75 0 0 0 1.195.606l6.24-4.532a.747.747 0 0 0 0-1.214z"
                data-original="#000000"
            />
            <Path
                d="M15.026.002C6.726.002 0 6.728 0 15.028c0 8.297 6.726 15.021 15.026 15.021 8.298 0 15.025-6.725 15.025-15.021.001-8.3-6.727-15.026-15.025-15.026zm0 27.54c-6.912 0-12.516-5.601-12.516-12.514 0-6.91 5.604-12.518 12.516-12.518 6.911 0 12.514 5.607 12.514 12.518.001 6.913-5.603 12.514-12.514 12.514z"
                data-original="#000000"
            />
        </Svg>
    )
}
