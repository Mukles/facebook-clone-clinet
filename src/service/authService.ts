import { AnyAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Dispatch } from "react";
import { authApi } from "../App/features/auth/authApi";
import { userLogin } from "../App/features/auth/authSlice";
import { auth } from "../firebase.init";
import { loginType } from "../types/registerTypes";

export const loginWithGoogle = async (dispatch: Dispatch<AnyAction>) => {
  const provider = new GoogleAuthProvider();
  dispatch(userLogin({ loading: true }));
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;
    const user = {
      email: userCredential.user.email,
      userName: userCredential.user.displayName,
      provider: userCredential.providerId,
    };

    dispatch(userLogin({ user, token, error: null, loading: false }));
  } catch (error) {
    dispatch(userLogin({ user: null, token: null, error, loading: false }));
  }
};

export const onAuthChanged = (dispatch: any) => {
  onAuthStateChanged(auth, async (userCredential) => {
    if (userCredential) {
      const token = await userCredential.getIdToken();
      const user = {
        email: userCredential.email,
        userName: userCredential.displayName,
        provider: userCredential.providerId,
      };
      const dbUser = await signInAndSignUp({ user, token }, dispatch);
      dispatchSucess(dbUser, dispatch);
    } else {
      dispatch(
        userLogin({ user: null, token: null, loading: false, error: null })
      );
    }
  });
};

export const signUpWithPassword = async (userData: loginType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );

  return userCredential;
};

export const loginWithPassword = async (userData: loginType) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  const user = {
    email: userCredential.user.email,
    userName: userCredential.user.displayName,
    provider: userCredential.providerId,
  };
  const token = await userCredential.user.getIdToken();
  return { user, token };
};

export const loginRequest = async (userData: any, dispatch: any, cb: any) => {
  try {
    const { user, token } = await cb(userData);
    if (user && token) {
      const result: any = await dispatch(
        authApi.endpoints.login.initiate(userData)
      );

      if (result.data) {
        dispatchSucess({ ...result.data, token }, dispatch);
      } else {
        throw new Error(result.error.data.message || "Something went wrong");
      }
    }
  } catch (error) {
    dispatchError(error, dispatch);
  }
};

export const registerRequst = async (userData: any, dispatch: any, cb: any) => {
  dispatch(userLogin({ loading: true }));
  try {
    const userCredential = await cb(userData);
    const token = await userCredential.user.getIdToken();
    const user = {
      email: userCredential.user.email,
      userName: userCredential.user.displayName,
      provider: userCredential.providerId,
    };

    if (user && token) {
      try {
        const result: any = await dispatch(
          authApi.endpoints.regster.initiate(userData)
        );
        if (result.data) {
          dispatchSucess({ ...result.data, token }, dispatch);
        } else {
          throw new Error(
            result?.error?.data?.message || "Something went wrong"
          );
        }
      } catch (error: any) {
        dispatchError(error, dispatch);
      }

      return;
    }
  } catch (error) {
    dispatchError(error, dispatch);
  }
};

const dispatchError = (error: any, dispatch: any) => {
  dispatch(
    userLogin({
      user: null,
      error: { message: error.message || "internal error 404" },
      loading: false,
      token: null,
    })
  );
};

const dispatchSucess = (data: any, dispatch: any) => {
  dispatch(
    userLogin({
      user: data,
      error: null,
      loading: false,
      token: data.token,
    })
  );
};

const signInAndSignUp = async (data: any, dispatch: any) => {
  try {
    const result = await dispatch(
      authApi.endpoints.signInAndSignUp.initiate(data)
    );
    return result.data;
  } catch (error) {
    dispatchError(error, dispatch);
  }
};
