import Home from "../../pages";
import Login from "../../pages/account/login";
import Register from "../../pages/account/register";
import MarketPlace from "../../pages/market-place";
import Messenger from "../../pages/messenger/index";
import MobileConversation from "../../pages/messenger/mobile/conversation";
import MobileSpecificConversation from "../../pages/messenger/mobile/[id]";
import SpecificConversation from "../../pages/messenger/[id]";
import Profile from "../../pages/profile";
import Videos from "../../pages/videos.tsx";
import Animated from "../../utilities/Animate";
import PublicRoute from "../../utilities/publicRoute";
import RequiredAuth from "../../utilities/requireAuth";

export const largeDevicesRoutes = [
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
        <Videos />
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
    path: "/market-place",
    element: (
      <RequiredAuth>
        <MarketPlace />
      </RequiredAuth>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <RequiredAuth>
        <Profile />
      </RequiredAuth>
    ),
  },
  {
    path: "*",
    element: <h1 className="nav-top">I am form not found</h1>,
  },
];

export const smallDevicesRoutes = [
  {
    path: "/",
    element: (
      <RequiredAuth>
        <Animated>
          <Home />
        </Animated>
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
        <Animated>
          <Videos />
        </Animated>
      </RequiredAuth>
    ),
  },
  {
    path: "/messenger",
    element: (
      <RequiredAuth>
        <Animated>
          <MobileConversation />
        </Animated>
      </RequiredAuth>
    ),
  },
  {
    path: "/messenger/:id",
    element: (
      <RequiredAuth>
        <Animated>
          <MobileSpecificConversation />
        </Animated>
      </RequiredAuth>
    ),
  },
  {},
  {
    path: "/profile/:id",
    element: (
      <RequiredAuth>
        <Profile />
      </RequiredAuth>
    ),
  },
  {
    path: "*",
    element: <h1 className="nav-top">I am form not found</h1>,
  },
];
