import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import styles from "./style.module.scss";
import classNames from "classnames";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type Props = {
  children: React.ReactElement;
};

export default function StoicWrapper({ children }: Props) {
  const [close, setClose] = useState(false);
  const [fade, setFade] = useState<boolean | null>(null);

  const wrapper = useRef(null);

  useEffect(() => {
    setFade(false);
  }, []);

  return (
    <Card
      className={classNames(
        styles.stoic,
        fade !== null && !fade && styles.show,
        fade !== null && fade && styles.hide,
        close && styles.hidden
      )}
      ref={wrapper}
    >
      {children}

      <Button
        className={styles.close}
        variant="ghost"
        size="icon"
        onClick={() => {
          setFade(true);
          setTimeout(() => {
            setClose(true);
          }, 700);
        }}
      >
        <X />
      </Button>
    </Card>
  );
}
