import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./style.module.scss";

interface Props {
  next: () => void;
}

export default function StoicControlls({ next }) {
  return (
    <div className={styles.root}>
      <Button variant={"ghost"}>
        <Pause size={16} />
      </Button>
      <Button variant={"ghost"}>
        <Play size={16} />
      </Button>
      <Button variant="ghost" onClick={next}>
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}
