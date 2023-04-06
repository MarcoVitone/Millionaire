import { Question } from "../../App";
import { FC, useEffect, useState } from "react";
import Timer from "../timer/Timer";
import LeaveGame from "../leaveGame/LeaveGame";
import Quiz from "../quiz/Quiz";
import Lose from "../lose/Lose";
import styles from "./Main.module.css";
import { useAwardContext } from "../../context/Context";

const Main: FC<Question> = (props) => {
  const [timeoutOver, setTimeoutOver] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [singleQuestionPoint, setSingleQuestionPoint] = useState(300);
  const [totalPoints, setTotalPoints] = useState(0);
  const { awardCounter, wrongAnswer } = useAwardContext();
  let interval: NodeJS.Timer;
  const singlePointMoltiplicator =
    awardCounter! < 6 ? 1 : awardCounter! >= 6 && awardCounter! < 10 ? 2 : 3;

  useEffect(() => {
    if (!stopTimer) {
      interval = setInterval(() => {
        setSingleQuestionPoint((prev) => prev - 1);
      }, 100);
    } else {
      clearInterval(interval);
      if (!timeoutOver && !wrongAnswer) {
        setTotalPoints(
          (prevPoints) =>
            prevPoints + singleQuestionPoint * singlePointMoltiplicator
        );
      }
      setSingleQuestionPoint(300);
    }
    return () => clearInterval(interval);
  }, [stopTimer]);

  return (
    <div className={styles.container}>
      {!timeoutOver ? (
        <>
          <div className={styles.iconContainer}>
            <LeaveGame
              stopTimer={stopTimer}
              setStopTimer={setStopTimer}
              setTimeoutOver={setTimeoutOver}
            />
            <Timer
              setTimeoutOver={setTimeoutOver}
              stopTimer={stopTimer}
              timeoutOver={timeoutOver}
            />
          </div>

          <Quiz
            category={""}
            type={""}
            difficulty={""}
            question={props.question}
            correct_answer={props.correct_answer}
            answers={props.answers}
            setStopTimer={setStopTimer}
            setTimeoutOver={setTimeoutOver}
            stopTimer={stopTimer}
          />
        </>
      ) : (
        <div>
          <Lose totalPoints={totalPoints} />
        </div>
      )}
    </div>
  );
};

export default Main;
