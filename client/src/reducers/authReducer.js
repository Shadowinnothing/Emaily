import {FETCH_USER} from '../actions/types';

// initial state is returned as null because we dont know
// if the user is logged in or not
export default function(state = null, action) {
  switch (action.type){
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
