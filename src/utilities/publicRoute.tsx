import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../App/store";
type Props = {
  children: React.ReactElement;
};
const PublicRoute = ({ children }: Props): React.ReactElement => {
  const { loading, user } = useSelector<RootState, any>((state) => state.auth);

  if (loading && !user) {
    return <h1>Loading....</h1>;
  }

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
