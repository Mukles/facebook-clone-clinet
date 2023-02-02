import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../service/authService";
import CustomInput from "../../utilities/customInput";
import { resetSchema } from "../../validation/loginValidition";

const ForgetPassword = () => {
  const navigate = useNavigate();

  return (
    <section className="forget-password login-container">
      <div className="container">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={resetSchema}
          onSubmit={({ email }, actions) => resetPassword(email)}
        >
          {({ isSubmitting, values }) => {
            return (
              <Form>
                <div className="login-form d-flex flex-column justify-content-center shadow-lg align-items-center">
                  <h2>Find Your Account</h2>
                  <p>
                    Please enter your email address or mobile number to search
                    for your account.
                  </p>
                  <div className="email w-100 position-relative">
                    <CustomInput
                      type={"email"}
                      name="email"
                      placeholder="Email address or phone number"
                    />
                  </div>
                  <div className="ms-auto d-flex buttons">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.8 }}
                      className="register login-button me-2"
                      onClick={() => navigate("/account/login")}
                    >
                      cancel
                    </motion.button>
                    <motion.button
                      disabled={isSubmitting}
                      type="submit"
                      whileTap={{ scale: 0.8 }}
                      className="register login-button"
                    >
                      Reset
                    </motion.button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default ForgetPassword;
