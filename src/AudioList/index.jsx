import { useRef } from "react";
import { BsMusicNote } from "react-icons/bs";
// import { FaPlay } from "react-icons/fa";
// import { FaPause } from "react-icons/fa";
import MusicWaves from "../MusicWaves/index";
import styles from "./styles.module.scss";

const Index = ({
  id,
  data,
  setCurrentAudio,
  activeAudio,
  setActiveAudio,
  setPlayBtnClickQty,
  seekBarProgress,
  playPauseBtnState,
  setPlayPauseBtnState,
  audioName,
  audioAuthor,
  audioLink,
  audioProgress,
  setBottomAudioPopup,
  wavesState,
  setWavesState,
  setFullScreenAudioPopup,
}) => {
  //// Реф играющего аудио
  const audioElem = useRef();

  
  let count = 0;

  //// Функция включения аудио
  const playAudio = () => {
    // audioElem.current.currentTime = 0;
    if (count === 0) {
      audioElem.current.play();

      audioElem.current.volume =
        JSON.parse(localStorage.getItem("volume")) ||
        localStorage.setItem("volume", JSON.stringify("1"));

      setCurrentAudio(audioElem.current);
      setPlayPauseBtnState(true);

      setActiveAudio({
        ...data[id - 1],
        active: true,
      });
      setBottomAudioPopup(true);
      setWavesState(true);
      if (activeAudio.active && activeAudio.id === id) {
        count++;
      }
      setPlayBtnClickQty(count);
    }
    if (count !== 0) {
      setFullScreenAudioPopup(true);
    }
  };

  return (
    <>
      <div className={styles.audioPlayer} onClick={playAudio}>
        <div
          style={{
            backgroundColor:
              activeAudio.id === id && activeAudio.active ? "#9191916e" : "",
          }}
          className={styles.audioBlock}
        >
          {/* <div className={styles.playPauseBtn}>
            {active && wavesState && playPauseBtnState ? (
              <FaPause onClick={pauseAudio} />
            ) : (
              <FaPlay onClick={playAudio} />
            )}
          </div> */}
          <div className={styles.audioPicture}>
            <BsMusicNote />
            {activeAudio.id === id && activeAudio.active && (
              <MusicWaves
                wavesState={wavesState}
                playPauseBtnState={playPauseBtnState}
                audioProgress={audioProgress}
              />
            )}
          </div>
          <div className={styles.audioInfoContainer}>
            <div className={styles.audioInfo}>
              <div className={styles.audioName}>{audioName}</div>
              <div className={styles.authorName}>{audioAuthor}</div>
            </div>
            <div className={styles.audioDuration}>2:11</div>
          </div>
        </div>
        <audio
          src={audioLink}
          ref={audioElem}
          onTimeUpdate={seekBarProgress}
        ></audio>
      </div>
    </>
  );
};

export default Index;
