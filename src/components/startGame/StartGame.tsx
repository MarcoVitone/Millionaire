import { Dispatch, FC } from "react";
import styles from "./StartGame.module.css";
import playAudio from "../../assets/src_sounds_play.mp3";

type Prop = {
  setStart: Dispatch<React.SetStateAction<boolean>>;
};

const StartGame: FC<Prop> = ({ setStart }) => {
  const handleStart = () => {
    setStart(true);
    const play = new Audio(playAudio);
    play.play();
    setTimeout(() => {
      play.pause();
    }, 3500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1>ARE YOU READY TO START THIS AMAZING GAME</h1>
      </div>
      <button className={styles.startButton} onClick={handleStart}>
        PLAY
      </button>
    </div>
  );
};

export default StartGame;
