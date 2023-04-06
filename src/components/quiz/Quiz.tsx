import { Dispatch, FC, useEffect, useState } from "react";
import { Question } from "../../App";
import { useAwardContext } from "../../context/Context";
import { FaPhone } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import styles from "./Quiz.module.css";
import correctAudio from "../../assets/src_sounds_correct.mp3";
import waitAudio from "../../assets/src_sounds_wait.mp3";
import wrongAudio from "../../assets/src_sounds_wrong.mp3";

type stopTimer = {
  setStopTimer: Dispatch<React.SetStateAction<boolean>>;
  setTimeoutOver: Dispatch<React.SetStateAction<boolean>>;
  stopTimer: boolean;
};

const Quiz: FC<Question & stopTimer> = (props) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { awardCounter, setAwardCounter, setAward, setWrongAnswer } =
    useAwardContext();
  const [newAnswers, setNewAnswers] = useState<
    { answer: string; isFiftyHelp: boolean }[]
  >([]);
  const [secondChoiceState, setSecondChoiceState] = useState(0);
  const [fiftyFifty, setFiftyFifty] = useState(false);
  const [fiftyFiftyOneTime, setFiftyFiftyOneTime] = useState(false);
  const [homeHelp, sethomeHelp] = useState(false);
  const [homeHelpOneTime, setHomeHelpOneTime] = useState(false);
  const [pubblicHelp, setPubblicHelp] = useState(false);
  const [pubblicHelpOneTime, setPubblicHelpOneTime] = useState(false);
  const [homeHelpString, setHomeHelpString] = useState("");
  const [pubblicHelpArr, setPubblicHelpArr] = useState<number[]>([]);

  useEffect(() => {
    setNewAnswers(
      props.answers.map((answer) => {
        return {
          answer: answer,
          isFiftyHelp: false,
        };
      })
    );
  }, [props.answers]);

  if (awardCounter === 6) {
    setAward!(5);
  } else if (awardCounter === 11) {
    setAward!(10);
  }

  const answersHandler = (e: React.MouseEvent<HTMLSpanElement>, i: number) => {
    const correct = new Audio(correctAudio);
    const wait = new Audio(waitAudio);
    const wrong = new Audio(wrongAudio);
    wait.play();
    props.setStopTimer(true);

    const handleWaitingResponse = (classList: DOMTokenList) => {
      if (props.correct_answer === i) {
        if (awardCounter! <= 5) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.correct);
            wait.pause();
            correct.play();
          }, 3000);
          setTimeout(() => {
            setAwardCounter!((prev) => prev + 1);
            classList.remove(styles.correct);
            props.setStopTimer(false);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 7000);
        } else if (awardCounter! <= 10) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.correct);
            wait.pause();
            correct.play();
          }, 6000);
          setTimeout(() => {
            setAwardCounter!((prev) => prev + 1);
            classList.remove(styles.correct);
            props.setStopTimer(false);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 10000);
        } else if (awardCounter! < 15) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.correct);
            wait.pause();
            correct.play();
          }, 10000);
          setTimeout(() => {
            setAwardCounter!((prev) => prev + 1);
            classList.remove(styles.correct);
            props.setStopTimer(false);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 14000);
        } else {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.correct);
            wait.pause();
            correct.play();
          }, 16000);
          setTimeout(() => {
            setAwardCounter!((prev) => prev + 1);
            classList.remove(styles.correct);
            props.setStopTimer(false);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 20000);
        }
      } else {
        setWrongAnswer!(true);
        if (awardCounter! <= 5) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.wrong);
            setIsCorrect(false);
            wait.pause();
            wrong.play();
          }, 3000);
          setTimeout(() => {
            classList.remove(styles.wrong);
            props.setTimeoutOver(true);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 7000);
        } else if (awardCounter! <= 10) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.wrong);
            setIsCorrect(false);
            wait.pause();
            wrong.play();
          }, 6000);
          setTimeout(() => {
            classList.remove(styles.wrong);
            props.setTimeoutOver(true);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 10000);
        } else if (awardCounter! < 15) {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.wrong);
            setIsCorrect(false);
            wait.pause();
            wrong.play();
          }, 10000);
          setTimeout(() => {
            classList.remove(styles.wrong);
            props.setTimeoutOver(true);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 14000);
        } else {
          setTimeout(() => {
            classList.remove(styles.active);
            classList.add(styles.wrong);
            setIsCorrect(false);
            wait.pause();
            wrong.play();
          }, 16000);
          setTimeout(() => {
            classList.remove(styles.wrong);
            props.setTimeoutOver(true);
            setHomeHelpOneTime(false);
            setPubblicHelpOneTime(false);
            setFiftyFiftyOneTime(false);
            correct.pause();
          }, 20000);
        }
      }
    };

    if (e.target instanceof Element) {
      let classList = e.target.classList;
      classList.add(styles.active);
      handleWaitingResponse(classList);
    }
  };

  let secondChoice: number;
  const handleFiftyHelp = () => {
    if (props.stopTimer) {
      return;
    }
    const randomAnswer = Math.floor(Math.random() * 3);
    if (randomAnswer !== props.correct_answer) {
      secondChoice = randomAnswer;
    } else if (randomAnswer === props.correct_answer && randomAnswer < 3) {
      secondChoice = randomAnswer + 1;
    } else {
      secondChoice = randomAnswer - 1;
    }
    newAnswers.forEach((_a, i) => {
      if (i !== props.correct_answer || i !== secondChoice) {
        newAnswers[i].isFiftyHelp = true;
        newAnswers[props.correct_answer].isFiftyHelp = false;
        newAnswers[secondChoice].isFiftyHelp = false;
      }
      setFiftyFiftyOneTime(true);
      setFiftyFifty(true);
    });
    setSecondChoiceState(secondChoice);
  };

  const handleHomeHelp = async () => {
    let randomAnswer = Math.floor(Math.random() * 4);
    const foo = Math.random() * 100;
    if (props.stopTimer) {
      return;
    }

    if (!fiftyFiftyOneTime) {
      if (foo < 70) {
        randomAnswer = props.correct_answer;
      } else {
        if (randomAnswer !== props.correct_answer) {
          randomAnswer = randomAnswer;
        } else if (randomAnswer === props.correct_answer && randomAnswer < 3) {
          randomAnswer = randomAnswer + 1;
        } else {
          randomAnswer = randomAnswer - 1;
        }
      }
    } else {
      randomAnswer = Math.random();
      if (randomAnswer < 0.5) {
        randomAnswer = props.correct_answer;
      } else {
        randomAnswer = secondChoiceState;
      }
    }

    setHomeHelpOneTime(true);
    sethomeHelp(true);
    setHomeHelpString(
      `Hi, I think the correct answer is: ${newAnswers[randomAnswer]?.answer}`
    );
  };

  const handlePubblicHelp = () => {
    if (props.stopTimer) {
      return;
    }
    const lenght = !fiftyFifty ? 4 : 2;
    const percentages = Array.from({ length: lenght }, () =>
      Math.floor(Math.random() * 101)
    );

    // Imposta la risposta corretta a 50%
    const position = props.correct_answer;
    const targetPercentage = 50;
    if (position < 2) {
      percentages[position] = targetPercentage;
    } else if (position === 2) {
      percentages[position - 1] = targetPercentage;
    } else {
      percentages[position - 2] = targetPercentage;
    }

    // Calcola la somma delle percentuali
    const sum = percentages.reduce((acc, curr) => acc + curr, 0);

    // Normalizza le percentuali in modo che la loro somma sia esattamente 100
    const normalizedPercentages = percentages.map((p) =>
      Math.round((p / sum) * 100)
    );

    setPubblicHelpArr(normalizedPercentages);
    setPubblicHelpOneTime(true);
    setPubblicHelp(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleFiftyHelp}
          disabled={fiftyFifty}
          className={`${styles.helpButton} ${
            fiftyFifty && styles.helpButtonActive
          }`}
        >
          <span
            className={`${styles.textIcon} ${
              fiftyFifty && styles.textIconActive
            }`}
          >
            50:50
          </span>
        </button>

        <button
          onClick={handleHomeHelp}
          disabled={homeHelp}
          className={`${styles.helpButton} ${
            homeHelp && !homeHelpOneTime && styles.helpButtonActive
          }  ${homeHelpOneTime && styles.helpButtonOpen}`}
        >
          {homeHelpOneTime ? (
            <span className={styles.homeHelpContainer}>{homeHelpString}</span>
          ) : (
            <FaPhone
              className={`${styles.icon} ${homeHelp && styles.iconActive} `}
            />
          )}
        </button>
        <button
          onClick={handlePubblicHelp}
          disabled={pubblicHelp}
          className={`${styles.helpButton} ${
            pubblicHelp && styles.helpButtonActive
          }`}
        >
          <ImUsers
            className={`${styles.icon} ${pubblicHelp && styles.iconActive}`}
          />
        </button>
      </div>

      <div className={styles.questionContainer}>
        <span className={styles.question}>{props?.question}</span>
      </div>
      <div className={styles.answersContainer}>
        {newAnswers.map((a, i) => (
          <span
            key={i}
            className={`${styles.answer} ${
              isCorrect === false &&
              i === props.correct_answer &&
              styles.correctWrong
            }`}
            onClick={(e) => answersHandler(e, i)}
          >
            {!a.isFiftyHelp ? a.answer : ""}
            {pubblicHelpOneTime && !fiftyFifty
              ? ` ${pubblicHelpArr[i]}%`
              : null}
            {fiftyFifty && pubblicHelpOneTime
              ? !a.isFiftyHelp
                ? i === props.correct_answer
                  ? ` ${pubblicHelpArr[0]}%`
                  : ` ${pubblicHelpArr[1]}%`
                : null
              : null}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
