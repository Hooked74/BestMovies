import React, { PureComponent } from "react";
import MovieAPIManager from "../../store/MovieAPIManager";
import Stars from "../Stars/Stars";
import styles from "./Thumbnail.scss";

export default ({ vote, poster, title, shortInfo }) =>
  poster ? (
    <div className={styles.container}>
      <img src={MovieAPIManager.resolveImage(poster)} />
      <div className={styles.overlay}>
        <div className={styles["short-info"]}>{shortInfo}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.vote} title={`${vote}`}>
        <Stars width="108" height="25" vote={vote} />
      </div>
    </div>
  ) : null;
