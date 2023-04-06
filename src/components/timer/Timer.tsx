import { Dispatch, FC, useEffect, useState } from "react";
import styles from "./Timer.module.css";
import { useAwardContext } from "../../context/Context";

interface Props {
  setTimeoutOver: Dispatch<React.SetStateAction<boolean>>;
  stopTimer: boolean;
  timeoutOver: boolean;
}

const Timer: FC<Props> = ({ setTimeoutOver, stopTimer, timeoutOver }) => {
  const [timer, setTimer] = useState(30);
  const { awardCounter } = useAwardContext();

  let interval: NodeJS.Timer;

  if (awardCounter === 16) {
    setTimeoutOver(true);
  }

  useEffect(() => {
    if (!stopTimer) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (awardCounter! <= 5) {
        setTimeout(() => {
          setTimer(30);
        }, 7000);
      } else if (awardCounter! <= 10) {
        setTimeout(() => {
          setTimer(30);
        }, 10000);
      } else if (awardCounter! < 15) {
        setTimeout(() => {
          setTimer(30);
        }, 14000);
      } else {
        setTimeout(() => {
          setTimer(30);
        }, 20000);
      }
    }

    return () => clearInterval(interval);
  }, [awardCounter, stopTimer, timeoutOver]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(interval);
      setTimer(0);
      setTimeoutOver(true);
    }
  }, [timer]);

  return (
    <div className={styles.container}>
      <h3>{timer}</h3>
    </div>
  );
};

export default Timer;
