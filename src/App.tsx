import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { cloneElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import { RootState } from "./App/store";
import Header from "./components/header";
import { largeDevicesRoutes, smallDevicesRoutes } from "./data/routes/routes";
import useWidth from "./hooks/useWidth";
import "./plugins/fontawesome-free/css/all.min.css";
import "./scss/app.scss";
import { onAuthChanged } from "./service/authService";

function App() {
  const dispatch = useDispatch();
  const width = useWidth();
  const location = useLocation();

  const direction: number = useSelector<RootState, any>(
    (state) => state.auth.direction
  );

  useEffect(() => {
    onAuthChanged(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const largeRoutes: any = useRoutes(
    largeDevicesRoutes.map((routes) => {
      return {
        path: routes.path,
        element: routes.element,
      };
    })
  );

  const smallRoutes: any = useRoutes(
    smallDevicesRoutes.map((routes) => {
      return {
        path: routes.path,
        element: routes.element,
      };
    })
  );

  if (width < 576) {
    return (
      <>
        <Header />
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {cloneElement(smallRoutes, { key: location.pathname })}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        {cloneElement(largeRoutes, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

export default App;
