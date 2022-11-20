import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../App/store";

const RequiredAuth = ({ children }: { children: any }) => {
  const { loading, user, error } = useSelector<RootState, any>(
    (state) => state.auth
  );
  console.log(error);
  console.log("isloading", loading);
  const location = useLocation();

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (!loading && !user) {
    return (
      <Navigate to={`/account/login`} replace state={{ from: location }} />
    );
  }

  return children;
};

export default RequiredAuth;
