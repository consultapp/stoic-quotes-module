import { initialParams } from "@/fixtures";
import styles from "./style.module.scss";

export function getPositionX(): CSSModuleClasses | string {
  switch (initialParams.positionX) {
    case "left":
      return styles[`stoic_left`];
    case "right":
      return styles[`stoic_right`];
  }
  return "";
}

export function getPositionY(): CSSModuleClasses | string {
  switch (initialParams.positionY) {
    case "top":
      return styles[`stoic_top`];
    case "bottom":
      return styles[`stoic_bottom`];
  }
  return "";
}
