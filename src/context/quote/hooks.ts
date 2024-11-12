import { useContext } from "react";
import { QuoteContext } from ".";
import { Quote } from "@/types";

export function useQuotes() {
  const { quotes } = useContext(QuoteContext);
  return quotes;
}

export function useSetQuote() {
  const { setQuotes } = useContext(QuoteContext);
  return setQuotes;
}

export type TPushQuote = ReturnType<typeof usePushQuote>;

export function usePushQuote() {
  const setQuotes = useSetQuote();

  return (q: Quote) => {
    setQuotes((prev) => [...prev, q]);
  };
}
