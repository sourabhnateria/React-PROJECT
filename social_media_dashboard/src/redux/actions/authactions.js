// src/redux/actions/authActions.js
import { auth } from '../../firebase';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGIN_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: LOGOUT });
};