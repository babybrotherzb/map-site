const LoadingSvg = ({ style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    style={style}
  >
    <g id="loading">
      <circle cx="90" cy="50" r="6" fill="rgba(255, 255, 255, .01)" />
      <circle cx="84.64" cy="70" r="6" fill="rgba(255, 255, 255, .05)" />
      <circle cx="70" cy="84.64" r="6" fill="rgba(255, 255, 255, .1)" />
      <circle cx="50" cy="90" r="6" fill="rgba(255, 255, 255, .2)" />
      <circle cx="30" cy="84.64" r="6" fill="rgba(255, 255, 255, .2)" />
      <circle cx="15.36" cy="70" r="6" fill="rgba(255, 255, 255, .3)" />
      <circle cx="10" cy="50" r="6" fill="rgba(255, 255, 255, .4)" />
      <circle cx="15.36" cy="30" r="6" fill="rgba(255, 255, 255, .5)" />
      <circle cx="30" cy="15.36" r="6" fill="rgba(255, 255, 255, .6)" />
      <circle cx="50" cy="10" r="6" fill="rgba(255, 255, 255, .7)" />
      <circle cx="70" cy="15.36" r="6" fill="rgba(255, 255, 255, .8)" />
      <circle cx="84.64" cy="30" r="6" fill="rgba(255, 255, 255, .9)" />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="2.5"
        repeatCount="indefinite"
      ></animateTransform>
    </g>
  </svg>
);
export default LoadingSvg;
