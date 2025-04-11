// src/redux/reducers/authReducer.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;