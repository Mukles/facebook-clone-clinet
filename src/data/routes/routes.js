import ProfilePreview from "../../components/friends/profilePreview";
import RequestGrid from "../../components/friends/requesGrid";
import PostWrapper from "../../components/post/postWrapper";
import AboutLayout from "../../components/profile/aboutLayout";
import OverView from "../../components/profile/overview";
import FriendLayout from "../../layout/friends/friendLayout";
import ProfileLayout from "../../layout/profileLayout";
import Home from "../../pages";
import NotFound from "../../pages/404";
import Login from "../../pages/account/login";
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

const mutualRoutes = [
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
        <Login />
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
        <ProfileLayout />
      </RequiredAuth>
    ),
    children: [
      {
        index: true,
        element: <PostWrapper />,
      },
      {
        path: "about",
        element: <AboutLayout />,
        children: [
          {
            index: true,
            element: <OverView />,
          },
          {
            path: "work_and_education",
            element: <OverView />,
          },
        ],
      },
    ],
  },

  {
    path: "/friends",
    element: (
      <RequiredAuth>
        <FriendLayout />
      </RequiredAuth>
    ),

    children: [
      {
        index: true,
        element: <RequestGrid />,
      },
      {
        path: "requests",
        element: <ProfilePreview />,
      },
      {
        path: "requests/:selectedId",
        element: <ProfilePreview />,
      },
      {
        path: "suggestions",
        element: <ProfilePreview />,
      },
      {
        path: "suggestions/:selectedId",
        element: <ProfilePreview />,
      },

      {
        path: "list",
        element: <ProfilePreview />,
      },
    ],
  },
];

export const largeDevicesRoutes = [
  ...mutualRoutes,
  {
    path: "/messenger",
    children: [
      {
        index: true,
        element: (
          <RequiredAuth>
            <Messenger />
          </RequiredAuth>
        ),
      },
      {
        path: ":id",
        element: (
          <RequiredAuth>
            <SpecificConversation />
          </RequiredAuth>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export const smallDevicesRoutes = [
  ...mutualRoutes,
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
