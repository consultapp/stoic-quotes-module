import { useState } from "react";
import { QuoteContext } from "./index";
import { Quote } from "@/types";

interface Props {
  children: React.ReactElement;
}

export default function QuoteContextProvider({ children }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  return (
    <QuoteContext.Provider value={{ quotes, setQuotes }}>
      {children}
    </QuoteContext.Provider>
  );
}
