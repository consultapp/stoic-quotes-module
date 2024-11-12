import React from "react";
import { Card } from "../ui/card";

type Props = {
  children: React.ReactElement;
};

export default function StoicWrapper({ children }: Props) {
  return <Card className="stoic">{children}</Card>;
}
