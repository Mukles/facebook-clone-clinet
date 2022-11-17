import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { userLogin } from "./App/features/auth/authSlice";
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

function App() {
  const dispatch = useDispatch();
  dispatch(userLogin({ loading: true }));

  useEffect(() => {
    onAuthChanged(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/messenger/:id" element={<SpecificConversation />} />
        <Route
          path="/messenger/mobile/conversation"
          element={<MobileConversation />}
        />
        <Route
          path="/messenger/mobile/conversation/:id"
          element={<MobileSpecificConversation />}
        />
      </Routes>
    </>
  );
}

export default App;
