import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./App/store";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import ToastContainer from "./components/Toast/toastList";
import CompleteRegister from "./utilities/CompleteRegister";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <SkeletonTheme>
      <BrowserRouter>
        <App />
        <ToastContainer />
        <CompleteRegister />
      </BrowserRouter>
    </SkeletonTheme>
  </Provider>
);
