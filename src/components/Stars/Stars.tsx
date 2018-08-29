import React from "react";

export default ({ width, height, vote }) => (
  <svg height={height} width={width} viewBox="0 0 108 25">
    <defs>
      <mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" fill="white">
        <g>
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            transform="translate(22)"
          />
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            transform="translate(44)"
          />
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            transform="translate(66)"
          />
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            transform="translate(88)"
          />
        </g>
      </mask>
    </defs>
    <g mask="url(#mask)">
      <rect fill="#ccc" width="100%" height="100%" />
      <rect fill="#ffd702" width={`${vote * 10}%`} height="100%" />
    </g>
  </svg>
);
