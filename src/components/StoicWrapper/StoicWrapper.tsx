import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import styles from "./style.module.scss";
import classNames from "classnames";
import CloseButton from "../CloseButton/CloseButton";

type Props = {
  children: React.ReactElement;
};

export default function StoicWrapper({ children }: Props) {
  const [close, setClose] = useState(false);
  const [fade, setFade] = useState<boolean | null>(null);

  const wrapper = useRef<React.RefAttributes<HTMLDivElement>>();

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
      <CloseButton
        close={() => {
          setFade(true);
          setTimeout(() => {
            setClose(true);
          }, 1000);
        }}
      />
    </Card>
  );
}
