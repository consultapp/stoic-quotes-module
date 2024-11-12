import { Quote } from "@/types";
import styles from "./style.module.scss";
import { CardContent } from "../ui/card";

type Props = { quote: Quote };

export default function Stoic({ quote }: Props) {
  return (
    <CardContent className={styles.root}>
      <blockquote className={styles.root__blockquote}>{quote.text}</blockquote>
      <p className={styles.root__author}>{quote.author}</p>
    </CardContent>
  );
}
