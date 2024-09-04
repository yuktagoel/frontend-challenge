import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { worker } from "./mocks/broswer";

async function prepareApp() {
  await worker.start();
  return Promise.resolve()
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

prepareApp().then(() => {
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
})
