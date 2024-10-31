interface Params {
  root?: HTMLDivElement;
  width?: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom" | "center";
  margin?: string;
  baseClassName?: string;
  serverApi: string;
}

type LOADING_STATUS = keyof typeof LOADING_STATUS;

type MESSAGE_TYPES = keyof typeof MESSAGE_TYPES;

interface Quote {
  text: string;
  author: string;
  type: MESSAGE_TYPES.quote;
}

interface QuoteError {
  text: string;
  type: MESSAGE_TYPES.error;
}

type ApiMessage = Quote | QuoteError;
