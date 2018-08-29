import React, { PureComponent } from "react";
import MovieAPIManager from "../../store/MovieAPIManager";
import styles from "./Thumbnail.scss";

export default ({ vote, poster, title, shortInfo }) => (
  <div className={styles.container}>
    <img src={MovieAPIManager.resolveImage(poster)} />
    <div className={styles.overlay}>
      <div className={styles["short-info"]}>{shortInfo}</div>
      <div className={styles.title}>{title}</div>
    </div>
    <div className={styles.vote} title={`${vote}`}>
      <svg height="25" width="108">
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
    </div>
  </div>
);
