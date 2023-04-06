import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import { AwardContext } from "./context/Context";
import StartGame from "./components/startGame/StartGame";

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: number;
  answers: [string];
}

type Api = Question[];

const initialState: Question = {
  category: "",
  type: "",
  difficulty: "",
  question: "",
  correct_answer: 0,
  answers: [""],
};

function App() {
  const [question, setQuestion] = useState<Question>(initialState);
  const [awardCounter, setAwardCounter] = useState(1);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [start, setStart] = useState(false);
  const [award, setAward] = useState(1);
  const [leave, setLeave] = useState(false);
  const context = {
    awardCounter,
    setAwardCounter,
    setStart,
    award,
    setAward,
    leave,
    setLeave,
    wrongAnswer,
    setWrongAnswer,
  };

  const fetchDataEasy = async () => {
    try {
      const res = await axios.get(
        "https://mocki.io/v1/d5b7d02a-3d3b-4747-8e96-78b7aa658b52"
      );
      const data: Api = res.data.easy;
      const question = Math.floor(Math.random() * data.length);
      setQuestion(data[question]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataMedium = async () => {
    try {
      const res = await axios.get(
        "https://mocki.io/v1/d5b7d02a-3d3b-4747-8e96-78b7aa658b52"
      );
      const data: Api = res.data.medium;
      const question = Math.floor(Math.random() * data.length);
      setQuestion(data[question]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataHard = async () => {
    try {
      const res = await axios.get(
        "https://mocki.io/v1/d5b7d02a-3d3b-4747-8e96-78b7aa658b52"
      );
      const data: Api = res.data.hard;
      console.log(data);
      const question = Math.floor(Math.random() * data.length);
      setQuestion(data[question]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (awardCounter < 6) {
      fetchDataEasy();
    } else if (awardCounter! >= 6 && awardCounter < 10) {
      fetchDataMedium();
    } else if (awardCounter >= 10) {
      fetchDataHard();
    } else if (awardCounter === 16) {
      return;
    }
  }, [awardCounter]);

  return (
    <div className={`${styles.app} ${!start && styles.appStart}`}>
      <AwardContext.Provider value={context}>
        {start ? (
          <>
            <div className={styles.mainContainer}>
              <Main {...question!} />
            </div>
            <Sidebar />
          </>
        ) : (
          <StartGame setStart={setStart} />
        )}
      </AwardContext.Provider>
    </div>
  );
}

export default App;
