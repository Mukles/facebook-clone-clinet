import { AnimatePresence, motion } from "framer-motion";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../App/store";
type Props = {
  children: React.ReactElement;
};
const PublicRoute = ({ children }: Props): React.ReactElement => {
  const { loading, user, loginLoader } = useSelector<RootState, any>(
    (state) => state.auth
  );

  if (loading && !user && !loginLoader) {
    return (
      <AnimatePresence>
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
      </AnimatePresence>
    );
  }

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
