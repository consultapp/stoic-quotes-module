import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./style.module.scss";

interface Props {
  next: () => void;
}

export default function StoicControlls({ next }: Props) {
  return (
    <div className={styles.root}>
      <Button variant={"ghost"} size="icon">
        <Pause />
      </Button>
      <Button variant={"ghost"} size="icon">
        <Play />
      </Button>
      <Button variant="ghost" size="icon" onClick={next}>
        <ArrowRight />
      </Button>
    </div>
  );
}
