import * as React from "react"
const Divider = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 300 100",
    }}
    viewBox="0 0 300 100"
    {...props}
  >
    <path
      d="M0 100h300V0z"
      style={{
        fill: "#ff0000",
      }}
    />
  </svg>
)
export default Divider
