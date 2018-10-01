import axios from 'axios';

import {
  toggleLoading,
  relativeToAbsoluteUrl,
  getTokenData,
} from '@Redux/helpers';
import {
  setCookie,
  getCookie,
  removeCookie,
} from '@Utils/cookie';

export const authLoading = state => state.auth.loading;
export const isAuthenticated = state => Boolean(state.auth.token);
export const isAuthorized = state => Boolean(state.auth.token);
export const getToken = state => state.auth.token;
export const getAuthorizedUser = state => state.auth.user;
export const getAuthUserId = state => (state.auth.user ? state.auth.user.id : null);

const INITIAL_STATE = {
  loading: false,
  token: null,
};

if (process.browser) {
  const savedToken = getCookie('mj-token');
  if (savedToken) {
    INITIAL_STATE.token = savedToken;
  }
}


// ACTION TYPES
const AUTH_EXPIRED = 'auth/expired';
const SIGNIN_USER = 'auth/signin/user';
const SIGNOUT_USER = 'auth/signout/user';


const SIGNIN = 'auth/signin';
const SIGNIN_ERROR = 'auth/signin/error';

const SIGNUP = 'auth/signin';
const SIGNUP_ERROR = 'auth/signin/error';


// ACTION CREATORS
export const authExpired = () => {
  removeCookie('mj-token');
  return ({
    type: AUTH_EXPIRED,
  });
};
export const signinUser = (token) => {
  const tokenData = getTokenData(token);

  if (tokenData) {
    setCookie('mj-token', token);

    return ({
      type: SIGNIN_USER,
      payload: tokenData,
    });
  }

  return authExpired();
};
export const signoutUser = () => {
  removeCookie('mj-token');
  return ({
    type: SIGNOUT_USER,
  });
};

const signInRequest = () => ({
  type: SIGNIN,
});
const signInError = error => ({
  type: SIGNIN_ERROR,
  payload: error,
});
export const signIn = ({ username, password }, Router) =>
  (dispatch) => {
    dispatch(signInRequest());

    return axios.post(relativeToAbsoluteUrl('v1/auth/signin'), { username, password })
      .then((response) => {
        dispatch(signinUser(response.data.token));
        Router.push('/');
      })
      .catch(error => dispatch(signInError(error)));
  };

const signUpRequest = () => ({
  type: SIGNIN,
});
const signUpError = error => ({
  type: SIGNUP_ERROR,
  payload: error,
});
export const signUp = ({ username, password }, Rouer) =>
  (dispatch) => {
    dispatch(signUpRequest());

    return axios.post(relativeToAbsoluteUrl('v1/auth/signup'), { username, password })
      .then(response => {
        dispatch(signinUser(response.data.token))
        Router.push('/');
      })
      .catch(error => dispatch(signUpError(error)));
  };


// ACTION HANDLERS
const ACTION_HANDLERS = {
  [SIGNIN]: prevState => toggleLoading(prevState),
  [SIGNIN_ERROR]: prevState => toggleLoading(prevState, false),


  [SIGNIN_USER]: (prevState, { payload }) => {
    const state = toggleLoading(prevState, false);
    state.token = payload.token;
    state.user = payload.user;

    return state;
  },
  [SIGNOUT_USER]: (prevState, { payload }) => {
    const state = toggleLoading(prevState, false);
    state.token = null;
    state.user = null;

    return state;
  },
  [AUTH_EXPIRED]: prevState =>
    ({
      ...prevState,
      token: null,
    }),
};


export default function reducer(state = INITIAL_STATE, action = {}) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
