export default function (state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return { isFetching: true };
    case 'SIGNUP_SUCCESS':
    case 'SIGNIN_SUCCESS':
    case 'LOGOUT_SUCCESS':
      return { user: action.user };
    case 'SIGNUP_FAILURE':
    case 'SIGNIN_FAILURE':
    case 'LOGOUT_FAILURE':
      return { msg: action.err };
    default:
      return state;
  }
}
