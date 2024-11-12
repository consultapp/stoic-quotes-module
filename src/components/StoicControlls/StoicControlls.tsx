import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import styles from "./style.module.scss";

export default function StoicControlls() {
  return (
    <div className={styles.root}>
      <Button variant={"outline"}>
        <Pause size={16} />
      </Button>
      <Button variant={"outline"}>
        <Play size={16} />
      </Button>
      <Button variant={"outline"}>
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}
