import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { initialParams } from "@/fixtures";

interface Props {
  next: () => void;
}

export default function StoicControlls({ next }: Props) {
  const [play, setPlay] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      next();
    }, Number(initialParams?.delay ?? 60) * 1000);
  }, [next, timer]);

  const stopTimer = useCallback(() => {
    clearInterval(timer.current);
  }, [timer]);

  useEffect(() => {
    if (play) startTimer();
    else stopTimer();
  }, [play, setPlay, startTimer, stopTimer]);

  return (
    <div className={styles.root}>
      {play && (
        <Button variant={"ghost"} size="icon" onClick={() => setPlay(false)}>
          <Pause />
        </Button>
      )}
      {!play && (
        <Button variant={"ghost"} size="icon" onClick={() => setPlay(true)}>
          <Play />
        </Button>
      )}
      <Button variant="ghost" size="icon" onClick={next}>
        <ArrowRight />
      </Button>
    </div>
  );
}
