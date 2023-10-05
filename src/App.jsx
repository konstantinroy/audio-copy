import { useEffect, useState } from "react";
import AudiosArray from "./AudiosArray";
import FullScreenAudioPopup from "./FullScreenAudioPopup/index";
import BottomAudioPopup from "./BottomAudioPopup/index";
import AudioList from "./AudioList/index";
import "./App.css";

function App() {
  const audios = [...document.getElementsByTagName("audio")];

  //// Функция для того, чтобы на странице проигрывалась только одна аудио-дорожка одновременно
  document.addEventListener(
    "play",
    (event) => {
      audios.forEach((audio) => audio !== event.target && audio.pause());
    },
    true
  );
  ////

  //// Массив всех аудио
  const [data, setData] = useState(AudiosArray);

  //// Объект играющего аудио
  const [activeAudio, setActiveAudio] = useState({});

  //// Аудио, играющее в данный момент
  const [currentAudio, setCurrentAudio] = useState(null);

  //// Состояние для отслеживания прогресса играющего аудио
  const [audioProgress, setAudioProgress] = useState(null);

  //// Состояние для того чтобы при повторном клике на аудио открывался полноэкранный аудиоплеер
  const [playBtnClickQty, setPlayBtnClickQty] = useState(0);

  //// Состояние для изменения кнопки с Play на Pause
  const [playPauseBtnState, setPlayPauseBtnState] = useState(false);

  //// Эффект волн нижнего попапа при проигрывании аудио
  const [wavesState, setWavesState] = useState(false);

  //// Длительность активного аудио
  const [audioDuration, setAudioDuration] = useState("");

  //// Сколько времени уже играет аудио
  const [audioСurrentTime, setAudioСurrentTime] = useState("");

  //// Видимость полноэкранного аудиоплеера
  const [fullScreenAudioPopup, setFullScreenAudioPopup] = useState(false);

  //// Видимость нижнего popup-аудиоплеера
  const [bottomAudioPopup, setBottomAudioPopup] = useState(false);

  //// Функция перемотки аудио и его прогресса
  const seekBarProgress = (e) => {
    const { value } = e.target;
    const duration = currentAudio.duration;
    const ct = currentAudio.currentTime;
    setAudioСurrentTime(Math.ceil(ct));

    setAudioProgress(Math.ceil((ct / duration) * 100));

    let audioMinutesDuration = Math.floor(duration / 60);
    let audioSecondsDuration = Math.round(
      currentAudio.duration - audioMinutesDuration * 60
    );
    setAudioDuration(audioMinutesDuration + ":" + audioSecondsDuration);
  };

  //// Автоматический переход к следующему аудио
  useEffect(() => {
    if (audioProgress === 100) {
      if (activeAudio.id !== data.length) {
        currentAudio.src = data[activeAudio.id].audioLink;
        currentAudio.play();
        setActiveAudio({
          ...data[activeAudio.id],
          active: true,
        });
        setPlayPauseBtnState(true);
      }
    }
  }, [audioProgress]);

  // console.log(playBtnClickQty)

  return (
    <>
      <div className="audiosList">
        {data.map((audio) => {
          return (
            <AudioList
              key={audio.id}
              id={audio.id}
              data={data}
              setData={setData}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
              activeAudio={activeAudio}
              setActiveAudio={setActiveAudio}
              playBtnClickQty={playBtnClickQty}
              setPlayBtnClickQty={setPlayBtnClickQty}
              seekBarProgress={seekBarProgress}
              playPauseBtnState={playPauseBtnState}
              setPlayPauseBtnState={setPlayPauseBtnState}
              audioName={audio.audioName}
              audioAuthor={audio.audioAuthor}
              audioLink={audio.audioLink}
              audioProgress={audioProgress}
              wavesState={wavesState}
              setWavesState={setWavesState}
              setBottomAudioPopup={setBottomAudioPopup}
              setFullScreenAudioPopup={setFullScreenAudioPopup}
            />
          );
        })}

        {fullScreenAudioPopup && (
          <FullScreenAudioPopup
            data={data}
            setData={setData}
            playPauseBtnState={playPauseBtnState}
            setPlayPauseBtnState={setPlayPauseBtnState}
            currentAudio={currentAudio}
            activeAudio={activeAudio}
            setActiveAudio={setActiveAudio}
            setPlayBtnClickQty={setPlayBtnClickQty}
            audioProgress={audioProgress}
            seekBarProgress={seekBarProgress}
            audioDuration={audioDuration}
            audioСurrentTime={audioСurrentTime}
            setBottomAudioPopup={setBottomAudioPopup}
            wavesState={wavesState}
            setWavesState={setWavesState}
            fullScreenAudioPopup={fullScreenAudioPopup}
            setFullScreenAudioPopup={setFullScreenAudioPopup}
          />
        )}
      </div>

      <BottomAudioPopup
        activeAudio={activeAudio}
        playPauseBtnState={playPauseBtnState}
        setPlayBtnClickQty={setPlayBtnClickQty}
        bottomAudioPopup={bottomAudioPopup}
        audioProgress={audioProgress}
        wavesState={wavesState}
        setFullScreenAudioPopup={setFullScreenAudioPopup}
      />
    </>
  );
}

export default App;
