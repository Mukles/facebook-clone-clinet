import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
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
import RequiredAuth from "./utilities/requireAuth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthChanged(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route
          path="/videos"
          element={
            <RequiredAuth>
              <Video />
            </RequiredAuth>
          }
        />
        <Route
          path="/messenger"
          element={
            <RequiredAuth>
              <Messenger />
            </RequiredAuth>
          }
        />
        <Route
          path="/messenger/:id"
          element={
            <RequiredAuth>
              <SpecificConversation />
            </RequiredAuth>
          }
        />
        <Route
          path="/messenger/mobile/conversation"
          element={
            <RequiredAuth>
              <MobileConversation />
            </RequiredAuth>
          }
        />
        <Route
          path="/messenger/mobile/conversation/:id"
          element={
            <RequiredAuth>
              <MobileSpecificConversation />
            </RequiredAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
