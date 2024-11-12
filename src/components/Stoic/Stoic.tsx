import { Quote } from "@/types";

type Props = { quote: Quote };

export default function Stoic({ quote }: Props) {
  return (
    <>
      <blockquote>{quote.text}</blockquote>
      <p></p>
    </>
  );
}
