import axios from 'axios';

import {FETCH_USER, FETCH_SURVEYS} from './types';

// These three functions do the exact same thing
// returns action of type FETCH_USER and the current user from
// the express server
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
};
// export const fetchUser = () => async (dispatch) =>
//     dispatch({type: FETCH_USER, payload: await axios.get('/api/current_user')});
//
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get('/api/current_user')
//       .then((res) => dispatch({type: FETCH_USER, payload: res}));
//   };
// };

// sends token from stripe to the backend server
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data});
};
