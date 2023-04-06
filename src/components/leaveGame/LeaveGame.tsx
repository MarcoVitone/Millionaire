import { Dispatch, FC } from "react";
import { useAwardContext } from "../../context/Context";
import styles from "./LeaveGame.module.css";

type Props = {
  stopTimer: boolean;
  setStopTimer: Dispatch<React.SetStateAction<boolean>>;
  setTimeoutOver: Dispatch<React.SetStateAction<boolean>>;
};

const LeaveGame: FC<Props> = ({ stopTimer, setStopTimer, setTimeoutOver }) => {
  const { setLeave } = useAwardContext();

  const handleLeave = () => {
    setTimeoutOver(true);
    setStopTimer(true);
    setLeave!(true);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleLeave}
        disabled={stopTimer}
        className={styles.helpButton}
      >
        <span className={styles.textIcon}>LEAVE</span>
      </button>
    </div>
  );
};

export default LeaveGame;
