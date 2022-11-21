import BarSvg from "../../assets/Header/barSvg";
import GammingSvg from "../../assets/Header/GammingSvg";
import GroupSvg from "../../assets/Header/GroupSvg";
import HomeSvg from "../../assets/Header/homeSvg";
import MarketPlaceSvg from "../../assets/Header/marketPlaceSvg";
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
      url: "/marketplace",
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
};
