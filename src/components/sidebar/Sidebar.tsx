import { useAwardContext } from "../../context/Context";
import styles from "./Sidebar.module.css";

export const moneyPyramid = [
  { id: 1, amount: "€ 100" },
  { id: 2, amount: "€ 200" },
  { id: 3, amount: "€ 300" },
  { id: 4, amount: "€ 500" },
  { id: 5, amount: "€ 1000" },
  { id: 6, amount: "€ 2000" },
  { id: 7, amount: "€ 4000" },
  { id: 8, amount: "€ 8000" },
  { id: 9, amount: "€ 16000" },
  { id: 10, amount: "€ 32000" },
  { id: 11, amount: "€ 64000" },
  { id: 12, amount: "€ 125000" },
  { id: 13, amount: "€ 250000" },
  { id: 14, amount: "€ 500000" },
  { id: 15, amount: "€ 1000000" },
];

const Sidebar = () => {
  const { awardCounter, award } = useAwardContext();

  return (
    <div className={styles.container}>
      <ul className={styles.moneyList}>
        {moneyPyramid.map((a) => (
          <li
            key={a.id}
            className={`${styles.moneyListItem} ${
              awardCounter === a.id && styles.active
            } ${award === a.id && awardCounter! > 5 && styles.award}`}
          >
            <span
              className={`${styles.moneyListItemNumber} ${
                a.id === 15 && styles.moneyListItemNumberMillion
              }`}
            >
              {a.id}
            </span>
            <span
              className={`${styles.moneyListItemAmount} ${
                a.id === 15 && styles.moneyListItemAmountMillion
              }`}
            >
              {a.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
