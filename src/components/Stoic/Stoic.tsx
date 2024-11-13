import { Quote } from "@/types";
import styles from "./style.module.scss";
import { CardContent } from "../ui/card";
import { useEffect, useRef, useState } from "react";

type Props = { quote: Quote };

export default function Stoic({ quote }: Props) {
  const [state, setState] = useState<Quote | null>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state && card) {
      card?.current?.classList?.add(styles.hide);
      card?.current?.classList?.remove(styles.show);

      setTimeout(() => {
        card?.current?.classList?.remove(styles.hide);
        setState(quote);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);

  useEffect(() => {
    setState(quote);
    card.current?.classList?.add(styles.show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContent className={styles.root} ref={card}>
      <blockquote className={styles.root__blockquote}>{state?.text}</blockquote>
      <p className={styles.root__author}>{state?.author}</p>
    </CardContent>
  );
}
