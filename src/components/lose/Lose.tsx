import { useAwardContext } from "../../context/Context";
import { moneyPyramid } from "../sidebar/Sidebar";
import { FC } from "react";
import styles from "./Lose.module.css";

type Prop = {
  totalPoints: number;
};

const Lose: FC<Prop> = ({ totalPoints }) => {
  const { awardCounter, award, leave } = useAwardContext();

  const lose = awardCounter! < 2;
  const normalWin = awardCounter! >= 2 && awardCounter! <= 15;
  const millionaireWin = awardCounter! === 16;

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {leave ? (
          <>
            {lose && (
              <>
                <h1>YOU LOSE!!!</h1>
                <h3>Il tuo punteggio: {totalPoints}</h3>
              </>
            )}
            {normalWin && (
              <>
                <h1>
                  CONGRATULATIONS YOU WIN{" "}
                  {moneyPyramid[awardCounter! - 2].amount}
                  !!!
                </h1>
                <h3>Il tuo punteggio: {totalPoints}</h3>
              </>
            )}
            {millionaireWin && (
              <>
                <h1>WOW WONDERFUL YOU WIN THE MILLION!!!</h1>
                <h3>Il tuo punteggio: {totalPoints}</h3>
              </>
            )}
          </>
        ) : awardCounter === 1 ? (
          <>
            <h1>YOU LOSE!!!</h1>
            <h3>Il tuo punteggio: {totalPoints}</h3>
          </>
        ) : (
          <>
            {award! > 2 ? (
              <>
                <h1>
                  CONGRATULATIONS YOU WIN {moneyPyramid[award! - 1].amount}
                  !!!
                </h1>
                <h3>Il tuo punteggio: {totalPoints}</h3>
              </>
            ) : (
              <>
                <h1>YOU LOSE!!!</h1>
                <h3>Il tuo punteggio: {totalPoints}</h3>
              </>
            )}
          </>
        )}
      </div>
      <button
        className={styles.restartButton}
        onClick={() => {
          window.location.reload();
        }}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default Lose;
