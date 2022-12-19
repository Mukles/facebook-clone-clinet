import { FastField, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../App/features/auth/authSlice";
import { useUpdateUserMutation } from "../../App/features/user/userApi";
import {
  authRequestHandler,
  signUpWithPassword,
} from "../../service/authService";
import Password from "../../utilities/password";
import {
  registerSchema,
  updateUserSchema,
} from "../../validation/loginValidition";

interface Props {
  setShow?: React.Dispatch<SetStateAction<boolean>>;
  user?: {};
}

const Register = ({ setShow, user }: Props) => {
  const dispatch = useDispatch();
  const onClose = () => {
    setShow && setShow(false);
  };

  const [updateUser, { isLoading, isSuccess, error, data }] =
    useUpdateUserMutation();

  return (
    <>
      <motion.div
        className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId="register-modal"
          className="register-modal rounded shadow"
        >
          <div className="register-header d-flex justify-content-between align-items-start">
            <div className="">
              <h1>{setShow ? "Sing up" : "Please complete registation."}</h1>
              <span>It's quick and easy.</span>
            </div>
            {setShow && (
              <button className="close" onClick={onClose}>
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
          <hr />
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              dateOfBrith: "",
              password: "",
              gender: "",
              ...user,
            }}
            validationSchema={setShow ? registerSchema : updateUserSchema}
            onSubmit={(values, actions) => {
              dispatch(setFormData(values));
              setShow
                ? authRequestHandler(values, dispatch, signUpWithPassword)
                : updateUser({
                    ...user,
                    ...values,
                    userName: values.firstName + " " + values.lastName,
                  });
            }}
          >
            {(values) => {
              return (
                <Form className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="form-group col-md-6">
                      <FastField name="firstName">
                        {({ field, meta }: any) => {
                          console.log(field);
                          return (
                            <input
                              {...field}
                              type="text"
                              className={`form-control input-field ${
                                meta.touched && meta.error && "input-error"
                              }`}
                              placeholder="First Name"
                              name="firstName"
                            />
                          );
                        }}
                      </FastField>
                    </div>
                    <div className="form-group col-md-6">
                      <FastField name="lastName">
                        {({ field, meta }: any) => {
                          return (
                            <input
                              {...field}
                              type="text"
                              className={`form-control input-field ${
                                meta.touched && meta.error ? "input-error" : ""
                              }`}
                              placeholder="Last Name"
                            />
                          );
                        }}
                      </FastField>
                    </div>
                  </div>
                  {setShow && (
                    <>
                      <div className="form-group">
                        <FastField name="email">
                          {({ field, meta }: any) => {
                            return (
                              <input
                                {...field}
                                type="text"
                                className={`form-control input-field ${
                                  meta.touched && meta.error && "input-error"
                                }`}
                                placeholder="Phone number Email"
                              />
                            );
                          }}
                        </FastField>
                      </div>

                      <div className="form-group">
                        <Password values={values.values} />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <FastField name="dateOfBrith">
                      {({ field, meta }: any) => {
                        return (
                          <input
                            name="dateOfBrith"
                            {...field}
                            className={`form-control input-field ${
                              meta.touched && meta.error && "input-error"
                            }`}
                            type="date"
                          />
                        );
                      }}
                    </FastField>
                  </div>

                  <div>
                    <legend className="col-form-label col pt-0">Gender</legend>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                      <Field name="gender">
                        {({ field, meta }: any) => {
                          return (
                            <input
                              {...field}
                              id="male"
                              className={`form-check-input ${
                                meta.touched && meta.error && "input-error"
                              }`}
                              type="radio"
                              value="male"
                            />
                          );
                        }}
                      </Field>
                    </div>

                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>

                      <Field name="gender">
                        {({ field, meta }: any) => {
                          return (
                            <input
                              {...field}
                              id="female"
                              className={`form-check-input ${
                                meta.touched && meta.error && "input-error"
                              }`}
                              type="radio"
                              value="female"
                            />
                          );
                        }}
                      </Field>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="other">
                        Others
                      </label>
                      <Field name="gender">
                        {({ meta, field }: any) => {
                          return (
                            <input
                              {...field}
                              id="other"
                              className={`form-check-input ${
                                meta.touched && meta.error && "input-error"
                              }`}
                              type="radio"
                              name="gender"
                              value="O"
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary register-submit mb-3"
                  >
                    Sign Up
                  </button>
                </Form>
              );
            }}
          </Formik>
        </motion.div>
      </motion.div>
    </>
  );
};
export default Register;
