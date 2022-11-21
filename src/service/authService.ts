import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { authApi } from "../App/features/auth/authApi";
import { userLogin } from "../App/features/auth/authSlice";
import { store } from "../App/store";
import { auth } from "../firebase.init";
import { loginType } from "../types/registerTypes";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const onAuthChanged = (dispatch: any) => {
  onAuthStateChanged(auth, async (userCredential) => {
    if (userCredential) {
      try {
        const data: any = store.getState().auth.formData;
        const token = await userCredential.getIdToken();
        const user = {
          email: userCredential.email,
          userName: userCredential.displayName,
          provider: userCredential.providerId,
        };
        const result = await signInAndSignUp(
          { user: { ...user, ...data }, token },
          dispatch
        );
        if (result.user) {
          dispatchSucess(result?.user, token, dispatch);
        } else {
          console.log(result);
        }
      } catch (error) {
        dispatch(
          userLogin({ user: null, token: null, loading: false, error: null })
        );
      }
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
  await signInWithEmailAndPassword(auth, userData.email, userData.password);
};

export const logOut = async (dispatch: any) => {
  try {
    await signOut(auth);
    return false;
  } catch (error) {
    dispatchError(error, dispatch);
    return false;
  }
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

const dispatchSucess = (data: any, token: string, dispatch: any) => {
  dispatch(
    userLogin({
      user: data,
      error: null,
      loading: false,
      token: token,
    })
  );
};

export const authRequestHandler = async (
  userData: any,
  dispatch: any,
  cb: any
) => {
  try {
    const userCredential = await cb(userData);
  } catch (error: any) {
    console.log(error.message);
    dispatchError(error, dispatch);
  }
};
