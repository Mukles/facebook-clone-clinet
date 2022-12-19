import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./App/store";

import App from "./App";
import ToastContainer from "./components/Toast/toastList";
import CompleteRegister from "./utilities/CompleteRegister";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
      <CompleteRegister />
    </BrowserRouter>
  </Provider>
);
