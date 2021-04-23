import React from "react";

function ScissorSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="scissor-svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 302 322"
      fill="none"
      stroke={props.stroke}
    >
      <circle cx="252" cy="272" r="45" strokeWidth="10" />
      <path
        d="M272 272C272 283.046 263.046 292 252 292C240.954 292 232 283.046 232 272C232 260.954 240.954 252 252 252C263.046 252 272 260.954 272 272Z"
        strokeWidth="10"
      />
      <line
        y1="-5"
        x2="295.743"
        y2="-5"
        transform="matrix(-0.713732 -0.700419 -0.700419 0.713732 223.89 235.124)"
        strokeWidth="10"
      />
      <path
        d="M17.3883 29.998C12.2952 43.1317 7.3064 72.8426 24.0049 91.6454C40.7033 110.448 73.0611 140.693 85.5 153.5C85.5 153.5 103.091 170.35 114.5 181C129.497 195 144.861 208.5 155 218C177.947 239.5 205.347 263.805 205.347 263.805"
        strokeWidth="10"
      />
      <circle cx="50" cy="271.573" r="45" strokeWidth="10" />
      <path
        d="M70 271.573C70 282.619 61.0457 291.573 50 291.573C38.9543 291.573 30 282.619 30 271.573C30 260.527 38.9543 251.573 50 251.573C61.0457 251.573 70 260.527 70 271.573Z"
        strokeWidth="10"
      />
      <line
        x1="74.9035"
        y1="230.599"
        x2="284.025"
        y2="21.4766"
        strokeWidth="10"
      />
      <path
        d="M283 27.0731C288.217 40.1584 293.485 69.8209 276.964 88.7801C260.443 107.739 228.617 138.822 216.299 151.745L170.043 195.907L96.1975 263.649"
        strokeWidth="10"
      />
      <g id="circle-mid" fill={props.stroke}>
        <circle cx="149.5" cy="185.5" r="7.5" />
      </g>
    </svg>
  );
}
export default ScissorSvg;
