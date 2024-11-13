import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import App from "./App.tsx";

const stoic = document.createElement("div");

createRoot(stoic).render(
  <StrictMode>
    <App />
  </StrictMode>
);

document.body.append(stoic);
