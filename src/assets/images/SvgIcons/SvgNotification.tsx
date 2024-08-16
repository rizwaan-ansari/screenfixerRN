import React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"

export default function SvgHome(props: SvgProps) {
    return (
        <Svg
        width={props?.width ?? 32}
        height={props?.height ?? 32}
        fill="none"
        {...props}
      >
        <Path
          fill="#002E86"
          d="M25.436 0H6.564A6.564 6.564 0 0 0 0 6.564v18.872A6.564 6.564 0 0 0 6.564 32h18.872A6.564 6.564 0 0 0 32 25.436V6.564A6.564 6.564 0 0 0 25.436 0Z"
        />
        <G filter="url(#a)">
          <Path
            fill="#001D54"
            d="M25.436 0H6.564A6.564 6.564 0 0 0 0 6.564v18.872A6.564 6.564 0 0 0 6.564 32h18.872A6.564 6.564 0 0 0 32 25.436V6.564A6.564 6.564 0 0 0 25.436 0Z"
          />
        </G>
        <Path
          fill="#FFFEFF"
          d="M16.349 23.487a1.53 1.53 0 0 0 1.551-1.551h-3.102a1.53 1.53 0 0 0 1.55 1.551Zm5.09-5.049v-4.033c0-2.426-1.72-4.456-3.962-4.992v-.508c0-.564-.31-1.072-.846-1.185-.776-.183-1.41.41-1.41 1.17v.537c-2.243.522-3.963 2.552-3.963 4.978v4.033l-1.537 1.58v.79h13.256v-.79l-1.537-1.58Z"
        />
        <Defs></Defs>
      </Svg>
    )
}
