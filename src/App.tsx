import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence, motion } from "framer-motion";
import { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import { RootState } from "./App/store";
import Header from "./components/header";
import useWidth from "./hooks/useWidth";
import Home from "./pages";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Messenger from "./pages/messenger/index";
import MobileConversation from "./pages/messenger/mobile/conversation";
import MobileSpecificConversation from "./pages/messenger/mobile/[id]";
import SpecificConversation from "./pages/messenger/[id]";
import Video from "./pages/videos";
import "./plugins/fontawesome-free/css/all.min.css";
import "./scss/app.scss";
import { onAuthChanged } from "./service/authService";
import PublicRoute from "./utilities/publicRoute";
import RequiredAuth from "./utilities/requireAuth";

const containerVarient = {
  hidden: (direction: number) => {
    return {
      x: direction === -1 ? window.innerWidth : -window.innerWidth,
    };
  },
  animate: (direction: number) => {
    return {
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        restDelta: 0.001,
        delay: 0.5,
      },
    };
  },
  exit: (direction: number) => {
    return {
      x: direction * window.innerWidth,
      transition: { ease: "easeInOut" },
    };
  },
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const index: number = useSelector<RootState, any>(
    (state) => state.auth.index
  );
  const [tuple, setTuple] = useState([null, index]);

  if (tuple[1] !== index) {
    setTuple([tuple[1], index]);
  }

  let prev = tuple[0] || 0;
  let direction = index > prev ? -1 : 1;

  useEffect(() => {
    onAuthChanged(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const element: any = useRoutes([
    {
      path: "/",
      element: (
        <RequiredAuth>
          <Home />
        </RequiredAuth>
      ),
    },
    {
      path: "/account/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/account/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/videos",
      element: (
        <RequiredAuth>
          <Video />
        </RequiredAuth>
      ),
    },
    {
      path: "/messenger",
      element: (
        <RequiredAuth>
          <Messenger />
        </RequiredAuth>
      ),
    },
    {
      path: "/messenger/:id",
      element: (
        <RequiredAuth>
          <SpecificConversation />
        </RequiredAuth>
      ),
    },
    {
      path: "/profile/:id",
      element: <h1>Hellow form profile</h1>,
    },
  ]);

  const width = useWidth();

  if (width < 576) {
    return (
      <>
        <Header />
        <AnimatePresence initial={false} custom={direction}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <RequiredAuth>
                  <motion.div
                    custom={direction}
                    variants={containerVarient}
                    initial={"hidden"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    <Home />
                  </motion.div>
                </RequiredAuth>
              }
            />

            <Route
              path="/account/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/account/register" element={<Register />} />
            <Route
              path="/videos"
              element={
                <RequiredAuth>
                  <motion.div
                    custom={direction}
                    variants={containerVarient}
                    initial={"hidden"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    <Video />
                  </motion.div>
                </RequiredAuth>
              }
            />
            <Route
              path="/messenger"
              element={
                <RequiredAuth>
                  <motion.div
                    custom={direction}
                    variants={containerVarient}
                    initial={"hidden"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    <MobileConversation />
                  </motion.div>
                </RequiredAuth>
              }
            />
            <Route
              path="/messenger/:id"
              element={
                <RequiredAuth>
                  <motion.div
                    custom={direction}
                    variants={containerVarient}
                    initial={"hidden"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    <MobileSpecificConversation />
                  </motion.div>
                </RequiredAuth>
              }
            />
            <Route path="/profile/:id" element={<h1>Hellow form profile</h1>} />
          </Routes>
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

export default App;
