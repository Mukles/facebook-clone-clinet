import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../App/store";

const RequiredAuth = ({ children }: { children: any }) => {
  const { loading, user } = useSelector<RootState, any>((state) => state.auth);
  console.log("isloading", loading);
  const location = useLocation();

  if (loading) {
    console.log("I am loading from loading ......");
    return <h1>Loading.....</h1>;
  }

  if (!loading && !user) {
    return <Navigate to={`/login`} replace state={{ from: location }} />;
  }

  return children;
};

export default RequiredAuth;
