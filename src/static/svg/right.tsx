const RightSvg = ({
  style = { fill: "#9C9EB9" },
  width = "28px",
  height = "28px",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1024 1024"
    version="1.1"
    style={style}
    {...rest}
  >
    <path
      d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
      p-id="2019"
    ></path>
  </svg>
);
export default RightSvg;
