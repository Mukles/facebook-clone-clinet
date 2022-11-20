import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import useWidth from "./hooks/useWith";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthChanged(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const width = useWidth();

  if (width < 576) {
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
                <Video />
              </RequiredAuth>
            }
          />
          <Route
            path="/messenger"
            element={
              <RequiredAuth>
                <MobileConversation />
              </RequiredAuth>
            }
          />
          <Route
            path="/messenger/:id"
            element={
              <RequiredAuth>
                <MobileSpecificConversation />
              </RequiredAuth>
            }
          />
          <Route path="/profile/:id" element={<h1>Hellow form profile</h1>} />
        </Routes>
      </>
    );
  }

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
        <Route path="/profile/:id" element={<h1>Hellow form profile</h1>} />
      </Routes>
    </>
  );
}

export default App;
