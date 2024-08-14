import React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
            width={16}
            height={16}
            fill="none"
            {...props}
        >
            <Path
            fill="#63C7EC"
            d="M15.57 6.96v-.001L9.041.432A1.463 1.463 0 0 0 8 0c-.393 0-.763.153-1.042.432L.434 6.955l-.006.007a1.475 1.475 0 0 0 1.026 2.512h.26v4.804c0 .95.773 1.724 1.724 1.724h2.554c.258 0 .468-.21.468-.47v-3.765c0-.434.353-.787.787-.787h1.506c.434 0 .787.353.787.787v3.766c0 .259.21.469.469.469h2.553c.951 0 1.725-.774 1.725-1.724V9.474h.24c.394 0 .764-.153 1.043-.431a1.475 1.475 0 0 0 0-2.083Z"
            />
        </Svg>
    )
}
