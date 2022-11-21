import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import logo from "../../assets/account/facebook.svg";
import {
  authRequestHandler,
  loginWithGoogle,
  loginWithPassword,
} from "../../service/authService";
import CustomInput from "../../utilities/customInput";
import ErrorModal from "../../utilities/errorModal";
import Password from "../../utilities/password";
import { loginSchema } from "../../validation/loginValidition";
import Register from "./register";

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const { user, loading, error } = useSelector<RootState, any>(
    (state) => state.auth
  );

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
                          <Password values={values} />
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
                                isSubmitting || loading ? "d-flex" : "d-none"
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
