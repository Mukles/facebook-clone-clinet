import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../App/store";
import logo from "../../assets/account/facebook.svg";
import {
  authRequestHandler,
  loginWithGoogle,
  loginWithPassword,
} from "../../service/authService";
import CustomInput from "../../utilities/customInput";
import ErrorModal from "../../utilities/errorModal";
import { loginSchema } from "../../validation/loginValidition";
import Register from "./register";

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const { user, loading, error } = useSelector<RootState, any>(
    (state) => state.auth
  );

  useEffect(() => {
    // if (user) {
    //   navigator("/");
    // }
  }, [user, navigator]);

  return (
    <section className="login-container py-5 px-0 mx-0">
      <AnimatePresence>
        {show && <Register setShow={setShow} />}
        {error && <ErrorModal key={"errormodal"} Error={error} />}
      </AnimatePresence>
      <div className="container">
        <div className="row gy-5 gy-lg-0">
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center ">
            <div className="brand-details">
              <div className="logo-img">
                <img width={300} height={120} src={logo} alt={"facebook"} />
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
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={(values, actions) =>
                  authRequestHandler(values, dispatch, loginWithPassword)
                }
              >
                {({ isSubmitting, values }) => {
                  return (
                    <Form>
                      <div className="login-form d-flex flex-column justify-content-center rounded shadow-lg align-items-center gap-3">
                        <div className="email w-100">
                          <CustomInput
                            type={"email"}
                            name="email"
                            placeholder="Email address or phone number"
                          />
                        </div>
                        <div className="password w-100 input-container">
                          <CustomInput
                            type={!passwordShow ? "password" : "text"}
                            name="password"
                            placeholder="Password"
                          />
                          <div
                            className={`${
                              values.password.length ? "d-block" : "d-none"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={passwordShow ? "d-none" : "d-block"}
                              onClick={() => setPasswordShow(true)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              onClick={() => setPasswordShow(false)}
                              className={
                                !passwordShow
                                  ? "d-none"
                                  : "d-block someidfkldjs dskfjal"
                              }
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          </div>
                        </div>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="login-button login-button position-relative"
                        >
                          Log in
                          <div className="d-flex justify-content-center loader">
                            <div
                              className={`spinner-border ${
                                isSubmitting && loading ? "d-flex" : "d-none"
                              }`}
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </button>
                        <div className="divider gap-3 d-flex justify-content-center align-items-center align-self-stretch">
                          OR Contiune With
                        </div>
                        <ul className="social-media d-flex gap-3 my-2 mx-auto align-itmes-center justify-content-center flex-wrap">
                          <li>
                            <button
                              type="button"
                              disabled={loading}
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
                            <button type="button">
                              <i className="fa-brands fa-twitter"></i>
                            </button>
                          </li>
                          <li>
                            <button type="button">
                              <i className="fa-brands fa-github"></i>
                            </button>
                          </li>
                        </ul>
                        <a href="">Forget Password?</a>
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
