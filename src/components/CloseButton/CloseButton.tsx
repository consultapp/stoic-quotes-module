import { X } from "lucide-react";
import styles from "./style.module.scss";

type Props = {
  close: () => void;
};

export default function CloseButton({ close }: Props) {
  return <X onClick={close} className={styles.root} size={16} />;
}
