import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./renderer";
import { Application } from "@/components";
import { InitBundle } from "./framework";
InitBundle().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  );
});
