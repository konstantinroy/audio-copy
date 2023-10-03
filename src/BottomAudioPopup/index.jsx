import { BsMusicNote } from "react-icons/bs";
import MusicWaves from "../MusicWaves/index";
import styles from "./styles.module.scss";

const Index = ({
  activeAudio,
  playPauseBtnState,
  setPlayBtnClickQty,
  bottomAudioPopup,
  audioProgress,
  wavesState,
  setFullScreenAudioPopup,
}) => {
  //// Функция открытия полноэкранного аудиоплеера
  const openFullScreenAudioPopup = () => {
    setFullScreenAudioPopup(true);
    setPlayBtnClickQty(1);
  };

  return (
    <>
      {activeAudio && bottomAudioPopup && (
        <div className={styles.audioBlock} onClick={openFullScreenAudioPopup}>
          <div className={styles.progressLine}>
            <div
              style={{ width: `${audioProgress + "%"}` }}
              className={styles.blueLine}
            ></div>
          </div>
          <div className={styles.audioBlockBox}>
            <div className={styles.artistInfo}>
              <div className={styles.audioPicture}>
                <BsMusicNote />
                <MusicWaves
                  activeAudio={activeAudio}
                  wavesState={wavesState}
                  playPauseBtnState={playPauseBtnState}
                  audioProgress={audioProgress}
                />
              </div>
              <div className={styles.audioInfo}>
                <div className={styles.audioName}>{activeAudio.audioName}</div>
                <div className={styles.audioAuthor}>
                  {activeAudio.audioAuthor}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
