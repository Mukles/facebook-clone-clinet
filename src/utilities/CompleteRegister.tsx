import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../App/store";
import Register from "../pages/account/register";
import { IUser } from "../types/userTypes";

interface IAuth {
  user: IUser;
  loading: Boolean;
}

const CompleteRegister = () => {
  const auth = useSelector<RootState, IAuth>((state) => state?.auth || {});

  const { userName, gender, dateOfBrith, email } = auth?.user || {};
  const fullName = userName?.split(" ");
  const firstName = fullName?.length ? fullName[0] : "";
  const lastName = fullName?.splice(1, userName?.length).join(" ");
  const user = { firstName, lastName, dateOfBrith, gender, email };

  return (
    <AnimatePresence>
      {!auth.loading && !gender && email && userName && (
        <Register user={{ ...auth.user, ...user }} />
      )}
    </AnimatePresence>
  );
};

export default CompleteRegister;
