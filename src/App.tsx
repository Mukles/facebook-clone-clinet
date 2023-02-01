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
  const { pathname } = useLocation();
  const theme = useSelector<RootState, string>((state) => state.theme.mode);

  useEffect(() => {
    onAuthChanged(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (document.querySelector("body") as HTMLBodyElement).className = theme;
  }, [theme]);

  const largeRoutes: any = useRoutes([...largeDevicesRoutes]);
  const smallRoutes: any = useRoutes(smallDevicesRoutes);

  if (width < 576) {
    return (
      <>
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          {cloneElement(smallRoutes)}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        {pathname.match(/\/profile|friend/gi)?.length
          ? cloneElement(largeRoutes)
          : cloneElement(largeRoutes, { key: pathname })}
      </AnimatePresence>
    </>
  );
}

export default App;
