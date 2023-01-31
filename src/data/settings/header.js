import BarSvg from "../../assets/Header/barSvg";
import GammingSvg from "../../assets/Header/GammingSvg";
import GroupSvg from "../../assets/Header/GroupSvg";
import HomeSvg from "../../assets/Header/homeSvg";
import MarketPlaceSvg from "../../assets/Header/marketPlaceSvg";
import NotificationSvg from "../../assets/Header/notificationSvg";
import VideoSvg from "../../assets/Header/videsSvg";

export const header = {
  large: [
    {
      id: 1,
      Icon: HomeSvg,
      url: "/",
    },
    {
      id: 2,
      Icon: VideoSvg,
      url: "/videos",
    },
    {
      id: 3,
      Icon: MarketPlaceSvg,
      url: "/market-place",
    },
    {
      id: 4,
      Icon: GroupSvg,
      url: "/groups",
      cls: "nav-item d-none d-xl-block",
    },
    {
      id: 5,
      Icon: BarSvg,
      url: "/bar",
      cls: "nav-item d-block d-xl-none",
    },
    {
      id: 6,
      Icon: GammingSvg,
      url: "/gamming",
      cls: "nav-item d-none d-xl-block",
    },
  ],
  small: [
    {
      id: 1,
      url: "/",
      icon: <HomeSvg />,
    },
    {
      id: 2,
      url: "/videos",
      icon: <VideoSvg />,
    },
    {
      id: 3,
      url: "/market-place",
      icon: <MarketPlaceSvg />,
    },
    {
      id: 4,
      url: "/group",
      icon: <GroupSvg />,
    },
    {
      id: 5,
      url: "/notification",
      icon: <NotificationSvg />,
    },
    {
      id: 6,
      url: "/bar",
      icon: <BarSvg />,
    },
  ],
};
