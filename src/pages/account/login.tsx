import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../App/store";
import logo from "../../assets/account/facebook.svg";
import {
  authRequestHandler,
  loginWithGithub,
  loginWithGoogle,
  loginWithPassword,
} from "../../service/authService";
import CustomInput from "../../utilities/customInput";
import ErrorModal from "../../utilities/errorModal";
import Password from "../../utilities/password";
import { loginSchema } from "../../validation/loginValidition";
import Register from "./register";
const loginInfos = {
  email: "",
  password: "",
};

const Login = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const { loginLoader, error } = useSelector<RootState, any>(
    (state) => state.auth
  );

  useEffect(() => {
    if (pathname === "/account/register") {
      setShow(true);
    }
  }, [pathname]);

  return (
    <section className="login-container py-3 py-lg-5 px-0 mx-0">
      <AnimatePresence>
        {show && <Register setShow={setShow} />}
        {error && <ErrorModal key={"errormodal"} Error={error} />}
      </AnimatePresence>
      <div className="container">
        <div className="row login-row">
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center ">
            <div className="brand-details">
              <div className="logo-img">
                <img src={logo} alt={"facebook"} />
              </div>
              <p>
                Facebook helps you connect and share with the people in your
                life.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <motion.div layoutId="register-modal">
              <Formik
                enableReinitialize
                initialValues={{ ...loginInfos }}
                validationSchema={loginSchema}
                onSubmit={(values, actions) =>
                  authRequestHandler(values, dispatch, loginWithPassword)
                }
              >
                {({ isSubmitting, values }) => {
                  return (
                    <Form>
                      <div className="login-form d-flex flex-column justify-content-center rounded shadow-lg align-items-center gap-3">
                        <div className="email w-100 position-relative">
                          <CustomInput
                            type={"email"}
                            name="email"
                            placeholder="Email address or phone number"
                          />
                        </div>
                        <div className="password w-100 input-container position-relative">
                          <Password values={values} />
                        </div>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="login-button login-button position-relative"
                        >
                          Log in
                          {loginLoader && (
                            <div className="loader">
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </div>
                          )}
                        </button>
                        <div className="divider gap-3 d-flex justify-content-center align-items-center align-self-stretch">
                          OR Contiune With
                        </div>
                        <ul className="social-media d-flex gap-3 my-2 mx-auto align-itmes-center justify-content-center flex-wrap">
                          <li>
                            <button
                              type="button"
                              disabled={loginLoader}
                              onClick={() =>
                                authRequestHandler(
                                  values,
                                  dispatch,
                                  loginWithGoogle
                                )
                              }
                            >
                              <i className="fa-brands fa-google"></i>
                            </button>
                          </li>
                          <li>
                            <button disabled={loginLoader} type="button">
                              <i className="fa-brands fa-twitter"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              disabled={loginLoader}
                              onClick={() =>
                                authRequestHandler(
                                  values,
                                  dispatch,
                                  loginWithGithub
                                )
                              }
                              type="button"
                            >
                              <i className="fa-brands fa-github"></i>
                            </button>
                          </li>
                        </ul>
                        <a href="/">Forget Password?</a>
                        <motion.button
                          type="button"
                          className="register login-button"
                          onClick={() => setShow(true)}
                        >
                          Create New Account
                        </motion.button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
