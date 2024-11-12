import React from "react";
import { Card } from "../ui/card";
import styles from "./style.module.scss";
import CloseButton from "../CloseButton/CloseButton";

type Props = {
  children: React.ReactElement;
};

export default function StoicWrapper({ children }: Props) {
  return (
    <Card className={styles.stoic}>
      {children}
      <CloseButton close={() => {}} />
    </Card>
  );
}
