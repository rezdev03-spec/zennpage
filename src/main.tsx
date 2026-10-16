import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Latin subset only, and only the weights the CSS actually uses (400 / 600 / 700 sans, 400 mono).
// The bare "400.css" imports pull in every unicode subset + unused weights.
import "@fontsource/geist-sans/latin-400.css";
import "@fontsource/geist-sans/latin-600.css";
import "@fontsource/geist-sans/latin-700.css";
import "@fontsource/geist-mono/latin-400.css";
import "./index.css";
import "./styles/hub.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
