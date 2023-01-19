import { motion } from "framer-motion";
import { useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../App/store";

const RequiredAuth = ({ children }: { children: any }) => {
  const { loading, user, error } = useSelector<RootState, any>(
    (state) => state.auth
  );
  const location = useLocation();

  useEffect(() => {
    console.log("I a m requred auth");
  }, []);

  if (loading) {
    return (
      <motion.div
        className="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </motion.div>
    );
  } else if (!loading && !user) {
    return (
      <Navigate to={`/account/login`} replace state={{ from: location }} />
    );
  }

  return children;
};

export default RequiredAuth;
