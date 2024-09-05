import React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"

export default function SvgCall(props: SvgProps) {
    return (
        <Svg
        width={36}
        height={36}
        fill="none"
        {...props}
      >
        <Rect width={36} height={36} fill="#2E7D32" rx={4} />
        <Path
          fill="#fff"
          d="M23.037 19.877a6.814 6.814 0 0 1-2.14-.341c-.334-.114-.746-.01-.95.2l-1.35 1.019c-1.565-.835-2.529-1.799-3.353-3.352l.99-1.314a.97.97 0 0 0 .238-.983 6.826 6.826 0 0 1-.343-2.143.964.964 0 0 0-.962-.963h-2.204a.964.964 0 0 0-.963.963C12 19.049 16.951 24 23.037 24c.531 0 .963-.432.963-.963V20.84a.964.964 0 0 0-.963-.963Z"
        />
      </Svg>
    )
}
