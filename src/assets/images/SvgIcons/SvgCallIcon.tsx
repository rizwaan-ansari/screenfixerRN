import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
        width={12}
        height={12}
        fill="none"
        {...props}
      >
        <Path
          fill="#2E7D32"
          d="M11.037 7.877a6.813 6.813 0 0 1-2.14-.341c-.335-.114-.746-.01-.95.2l-1.35 1.019C5.032 7.92 4.068 6.956 3.244 5.403l.99-1.314a.97.97 0 0 0 .238-.983A6.824 6.824 0 0 1 4.13.963.964.964 0 0 0 3.167 0H.963A.964.964 0 0 0 0 .963C0 7.049 4.951 12 11.037 12c.531 0 .963-.432.963-.963V8.84a.964.964 0 0 0-.963-.962Z"
        />
      </Svg>
    )
}
