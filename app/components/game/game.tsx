import { DifficultyType, SystemNumbersType, statsType } from "@/types";

import { FormEvent, useEffect, useState } from "react";

import Input from "./input";
import Result from "./result";

import { ArrowRight } from "lucide-react";

import {
  compareNumbers,
  generateNumber,
  getConversion,
} from "@/app/utils/generateNumbers";

import { difficultyMap } from "@/app/utils/map";
import { useTranslations } from "next-intl";

interface GameProps {
  from: SystemNumbersType;
  to: SystemNumbersType;
  difficulty: DifficultyType;
}

const Game = ({ from, to, difficulty }: GameProps) => {

  const translate = useTranslations("game");

  const [generatedNumber, setGeneratedNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const resetGame = (from: SystemNumbersType, difficulty: DifficultyType) => {
    setError("");
    setShowResult(false);
    setGeneratedNumber(generateNumber(from, true, difficultyMap[difficulty]));
    setInputNumber("");
    setScore(0);
    setRounds(0);
  };

  useEffect(() => {
    resetGame(from, difficulty);
  }, [from, difficulty]);

  useEffect(() => {
    if (rounds === 5) {
      setShowResult(true);

      const statsStorage = localStorage.getItem("stats");

      if (statsStorage) {
        let statsJson = JSON.parse(statsStorage) as statsType;

        statsJson.timesPlayed = statsJson.timesPlayed + 5;
        statsJson.timesWon = statsJson.timesWon + score;

        localStorage.setItem("stats", JSON.stringify(statsJson));
      } else {
        const stats = {
          timesPlayed: 5,
          timesWon: score,
        } as statsType;
        localStorage.setItem("stats", JSON.stringify(stats));
      }
    }
  }, [rounds, score]);

  const checkNumber = (e: FormEvent) => {
    e.preventDefault();
    if (!inputNumber) return;

    if (compareNumbers(generatedNumber, inputNumber, from, to)) {
      setScore((prev) => prev + 1);
      setRounds((prev) => prev + 1);
      setGeneratedNumber(generateNumber(from));
      setInputNumber("");
    } else {
      const correctNumber = getConversion(from, to, generatedNumber);
      setError(correctNumber);
      setInputNumber("");

      setTimeout(() => {
        setError("");
        setGeneratedNumber(generateNumber(from));
        setRounds((prev) => prev + 1);
      }, 1000);
    }
  };

  return (
    <div>
      {!showResult ? (
        <>
          <form
            className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 mt-5"
            onSubmit={checkNumber}
          >
            <Input
              id="generated-number"
              value={generatedNumber}
              type={from}
              disabled
            />
            <ArrowRight className="text-primary dark:text-primary-dark mt-5 rotate-90 lg:-rotate-0" />
            <Input
              id="input-number"
              type={to}
              disabled={error.length > 0}
              placeholder={error}
              submitable={!error}
              value={inputNumber}
              error={error}
              onChange={({ target }) => setInputNumber(target.value)}
            />
          </form>
          <p className="font-medium text-center text-primary dark:text-primary-dark mt-5 lg:mt-10">
            {translate("score")}: {score}/5
          </p>
          <p className="text-secondary dark:text-secondary-dark text-center font-medium text-xs">
            {translate("rounds")}: {rounds}/5
          </p>
        </>
      ) : (
        <Result
          score={score}
          rounds={rounds}
          playAgain={() => resetGame(from, difficulty)}
        />
      )}
    </div>
  );
};

export default Game;
