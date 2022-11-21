import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  id: number;
  Icon: any;
  url: string;
  cls?: string | undefined;
}

const CustomeNav = ({ Icon, url, cls, id }: Props) => {
  const { pathname } = useLocation();
  return (
    <li className={cls ? cls : "nav-item"}>
      <NavLink
        to={url}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <Icon isActive={pathname === url ? true : false} />
        {pathname === url && (
          <motion.div className="underline" layoutId="underline"></motion.div>
        )}
      </NavLink>
    </li>
  );
};

export default CustomeNav;
