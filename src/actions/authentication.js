import { createAction } from '../helpers/redux';
import api from '../configs/api';

export const signInStart = createAction('SIGN_IN_START');
export const signInComplete = createAction('SIGN_IN_COMPLETE', 'data');

export function twitterAuthRequest({token, user}) {
  return dispatch => {
    dispatch(signInStart());
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    api.token = token;

    dispatch(signInComplete({
      token,
      user,
    }));
  }
}