import React from "react";
import styles from "./styles.module.scss";

const Index = ({ playPauseBtnState, wavesState, audioProgress }) => {
  const wavesStyle = {
    animationPlayState: playPauseBtnState && wavesState && audioProgress !== 100 ? "running" : "paused",
  };
  return (
    <div class={styles.wave}>
      <div style={wavesStyle} className={styles.items}></div>
      <div style={wavesStyle} className={styles.items}></div>
      <div style={wavesStyle} className={styles.items}></div>
      <div style={wavesStyle} className={styles.items}></div>
      <div style={wavesStyle} className={styles.items}></div>
    </div>
  );
};

export default Index;