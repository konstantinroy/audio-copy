import { useState, useEffect, useRef } from "react";
import { BsMusicNote } from "react-icons/bs";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsFillVolumeOffFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import styles from "./styles.module.scss";

const Index = ({
  data,
  setData,
  playPauseBtnState,
  setPlayPauseBtnState,
  activeAudio,
  setActiveAudio,
  setPlayBtnClickQty,
  currentAudio,
  audioProgress,
  audioСurrentTime,
  seekBarProgress,
  audioDuration,
  setBottomAudioPopup,
  setWavesState,
  setFullScreenAudioPopup,
}) => {
  //// Состояние включения и выключения звука во время проигрывания аудио
  const [onOffVolume, setOnOffVolume] = useState(true);

  //// Реф контроллера звука аудио
  const volumeRangeRef = useRef();

  //// Реф контроллера прогресса играющего аудио
  const audioProgressLine = useRef();

  //// Состояние уровня звука играющего аудио
  const [volume, setVolume] = useState(
    JSON.parse(localStorage.getItem("volume")) ||
      localStorage.setItem("volume", JSON.stringify("1"))
  );

  //// Функция для сворачивания полноэкранного аудиоплеера
  const hideFullScreenAudioPopup = () => {
    setFullScreenAudioPopup(false);
  };

  //// Функция включения аудио
  const playAudio = () => {
    currentAudio.play();
    setPlayPauseBtnState((prevState) => !prevState);
  };

  //// Функция паузы аудио
  const pauseAudio = () => {
    currentAudio.pause();
    setPlayPauseBtnState((prevState) => !prevState);
  };

  //// Функция переключения на предыдущее аудио
  const playPrevSong = (id) => {
    const currIndex = data.findIndex(({ id: elemId }) => id === elemId);
    const newIndex = currIndex === 0 ? data.length - 1 : currIndex - 1;

    currentAudio.src = data[newIndex].audioLink;
    currentAudio.play();
    setActiveAudio({
      ...data[newIndex],
      active: true,
    });
    setPlayPauseBtnState(true);
    let count = 1;
    setPlayBtnClickQty(count);
  };

  //// Функция переключения на следующее аудио
  const playNextSong = (id) => {
    const currIndex = data.findIndex(({ id: elemId }) => id === elemId);
    const newIndex = currIndex === data.length - 1 ? 0 : currIndex + 1;

    currentAudio.src = data[newIndex].audioLink;
    currentAudio.play();
    setActiveAudio({
      ...data[newIndex],
      active: true,
    });
    setPlayPauseBtnState(true);
    let count = 1;
    setPlayBtnClickQty(count);
  };

  //// Функция для определения сколько времени уже играет аудио
  const currentTimeFn = (time) => {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }

    return "00:00";
  };

  //// Функция для перемотки аудио по клику
  const rewindAudio = (e) => {
    let width = audioProgressLine.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    currentAudio.currentTime = (divprogress / 100) * currentAudio.duration;
  };

  //// Звук играющего аудио

  // useEffect(() => {
  //   const savedVolume = localStorage.getItem("volume");
  //   if (savedVolume) {
  //     currentAudio.volume = parseFloat(savedVolume);
  //     setVolume(parseFloat(savedVolume));
  //     volumeRangeRef.current.value = parseFloat(savedVolume) * MAX;
  //   }
  // }, []);

  const MAX = 20;

  //// Функция изменения уровня звука играющего аудио
  const handleVolume = (e) => {
    const { value } = e.target;
    localStorage.setItem("volume", JSON.stringify(Number(value) / MAX));
    currentAudio.volume = JSON.parse(localStorage.getItem("volume"));
    setVolume(currentAudio.volume);
    volumeRangeRef.value = volume;
  };

  //// Функция включения звука во время проигрывания аудио
  const onVolume = () => {
    currentAudio.volume = volume;
    setOnOffVolume(true);
  };

  //// Функция выключения звука во время проигрывания аудио
  const offVolume = () => {
    currentAudio.volume = 0;
    setOnOffVolume(false);
  };

  //// Закрытие плеера и выключение аудио
  const turnOffAudios = () => {
    const dataCopy = [...data];
    dataCopy.map((audio) => {
      if (audio.active) {
        audio.active = false;
      }
      setData(dataCopy);
    });
    const activeAudioCopy = { ...activeAudio, active: false };
    setActiveAudio(activeAudioCopy);
    currentAudio.pause();
    currentAudio.currentTime = 0;

    setBottomAudioPopup(false);
    setFullScreenAudioPopup(false);
    setWavesState(false);
  };

  return (
    <div className={styles.fullScreenAudioPopup}>
      <div className={styles.topBlock}>
        <div className={styles.hideButton} onClick={hideFullScreenAudioPopup}>
          <div className={styles.hideBtn}></div>
        </div>
        <div className={styles.audioImageBlock}>
          <div className={styles.audioImgBlock}>
            <BsMusicNote className={styles.audioImg} />
          </div>
        </div>
        <div className={styles.audioProgressLineBlock}>
          <input
            type="range"
            min={0}
            max={100}
            value={audioProgress}
            onChange={(e) => seekBarProgress(e)}
            onClick={rewindAudio}
            ref={audioProgressLine}
            className={styles.audioRange}
          ></input>
        </div>
        <div className={styles.timers}>
          <div className={styles.timersBlock}>
            <div className={styles.currentTime}>
              {currentTimeFn(audioСurrentTime)}
            </div>
            <div className={styles.duration}>{audioDuration}</div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBlock}>
        <div className={styles.audioInfo}>
          <div className={styles.audioName}>{activeAudio.audioName}</div>
          <div className={styles.authorName}>{activeAudio.audioAuthor}</div>
        </div>
        <div className={styles.controlsAudioButtons}>
          <div className={styles.prevNextBtn}>
            <TbPlayerTrackPrevFilled
              onClick={() => playPrevSong(activeAudio.id)}
            />
          </div>
          <div className={styles.playPauseBtn}>
            {!playPauseBtnState ? (
              <FaPlay onClick={playAudio} />
            ) : (
              <FaPause onClick={pauseAudio} />
            )}
          </div>
          <div className={styles.prevNextBtn}>
            <TbPlayerTrackNextFilled
              onClick={() => playNextSong(activeAudio.id)}
            />
          </div>
        </div>
        <div className={styles.volumeBlock}>
          <div className={styles.volumeBackIcon}>
            <BsFillVolumeOffFill onClick={offVolume} />
          </div>

          <div className={styles.volumeController}>
            <input
              ref={volumeRangeRef}
              disabled={!onOffVolume}
              type="range"
              min={0}
              max={MAX}
              value={volume * MAX}
              onChange={(e) => handleVolume(e)}
              className={styles.inputRange}
            ></input>
          </div>

          <div className={styles.volumeIcon}>
            <BsFillVolumeUpFill onClick={onVolume} />
          </div>
        </div>

        <div className={styles.closePlayerButton}>
          <button onClick={turnOffAudios}>Закрыть плеер</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
