import * as React from "react"
import Svg, { SvgProps, Path, Circle, Mask, G, Rect } from "react-native-svg"

export const SvgHome = (props: SvgProps) => (
  <Svg
    width={props?.width ?? 18}
    height={props?.height ?? 18}
    fill="none"
    {...props}
  >
    <Path
      stroke={props?.stroke}
      d="M16.57 7.96v-.001l-6.528-6.527A1.463 1.463 0 0 0 9 1c-.393 0-.763.153-1.042.432L1.434 7.955l-.006.007a1.475 1.475 0 0 0 1.026 2.512h.26v4.804c0 .95.773 1.724 1.724 1.724h2.554c.258 0 .468-.21.468-.47v-3.765c0-.434.353-.787.787-.787h1.506c.434 0 .787.353.787.787v3.766c0 .259.21.469.469.469h2.553c.951 0 1.725-.774 1.725-1.724v-4.804h.24c.394 0 .764-.153 1.043-.431a1.475 1.475 0 0 0 0-2.083Z"
    />
  </Svg>
)

export const SvgSearch = (props: SvgProps) => (
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

export const SvgProfile = (props: SvgProps) => (
  <Svg
    width={props?.width ?? 18}
    height={props?.height ?? 18}
    fill="none"
    {...props}
  >
    <Circle cx={8.25} cy={8} r={7.5} stroke="#fff" />
    <Mask
      id="a"
      width={props?.width ?? 18}
      height={props?.height ?? 18}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Circle cx={8.25} cy={8} r={8} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#a)">
      <Circle cx={8.304} cy={15.18} r={5.026} stroke="#fff" />
    </G>
    <Circle cx={8.25} cy={7.077} r={3.077} stroke="#fff" />
  </Svg>
)

export const SvgWallet = (props: SvgProps) => (
  <Svg
    width={props?.width ?? 16}
    height={props?.height ?? 18}
    preserveAspectRatio="none"
    fill="none"
    {...props}
  >
    <Rect
      width={props?.width ?? 18}
      height={props?.height ?? 18}
      x={1}
      y={4.076}
      stroke="#fff"
      strokeLinejoin="round"
      rx={1}
    />
    <Path
      stroke="#fff"
      strokeLinejoin="round"
      d="M14.975 4.076V2.922a1.923 1.923 0 0 0-2.283-1.888L2.563 2.763A1.923 1.923 0 0 0 1 4.653v1.885"
    />
    <Path
      fill="#fff"
      d="M13.308 10.846a1.23 1.23 0 1 1 0-2.462 1.23 1.23 0 0 1 0 2.462Z"
    />
  </Svg>
)
