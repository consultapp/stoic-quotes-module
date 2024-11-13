import { TPushQuote } from "@/context/quote/hooks";
import {
  initialParams,
  MESSAGE_TYPES,
  MINIMUM_QUOTES_POOL_LENGTH,
} from "@/fixtures";
import { ApiMessage, Quote } from "@/types";

let loadingCount = 0;

export function fillQuotesPool(currentCount: number, push: TPushQuote) {
  if (loadingCount <= 0)
    for (
      let i = currentCount;
      i < MINIMUM_QUOTES_POOL_LENGTH;
      i++, loadingCount++
    )
      loadRandomQuote(push);
}

export function loadRandomQuote(push: TPushQuote) {
  fetch(initialParams.serverApi)
    .then((data) => data.json())
    .then((message: ApiMessage) => {
      loadingCount--;
      if (!message || message?.type === MESSAGE_TYPES.error) {
        console.log(message.text);
        return;
      }
      if (message && message?.type === MESSAGE_TYPES.quote) {
        push(message as Quote);
        return;
      }
    })
    .catch(() => {
      console.log("Error");
    });
}
