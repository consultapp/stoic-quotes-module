import { Quote } from "@/types";
import { createContext } from "react";

interface QuoteContext {
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}

const initialQuoteContext: QuoteContext = {
  quotes: [],
  setQuotes: () => {},
};

export const QuoteContext = createContext<QuoteContext>(initialQuoteContext);
