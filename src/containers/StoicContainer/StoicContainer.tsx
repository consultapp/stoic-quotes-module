import { usePushQuote, useQuotes } from "@/context/quote/hooks";
import { useEffect, useState } from "react";
import Stoic from "@/components/Stoic/Stoic";
import StoicWrapper from "@/components/StoicWrapper/StoicWrapper";
import { fillQuotesPool } from "@/functions/loadQuotes";
import StoicControlls from "@/components/StoicControlls/StoicControlls";
import { X } from "lucide-react";

let render = 0;
export default function StoicContainer() {
  const pushQuote = usePushQuote();
  const quotes = useQuotes();
  const [current, setCurrent] = useState(0);

  const isEmpty = current >= quotes.length;

  console.log("render++", render++);

  useEffect(() => {
    fillQuotesPool(quotes.length - current, pushQuote);
  }, [quotes, pushQuote, current]);

  return (
    <StoicWrapper>
      {isEmpty ? (
        <div>Loading</div>
      ) : (
        <>
          <Stoic quote={quotes[current]} />
          <StoicControlls />
        </>
      )}
    </StoicWrapper>
  );
}
