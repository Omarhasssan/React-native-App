const intialState = {
  user: {
    id: '-L8TyAXqmrK_vf5h-0NH',
    imgUri: '',
    mobilenumber: '123',
    name: 'a1',
    password: 'aaaa',
  },
};
export default function (state = intialState, action) {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return { isFetching: true };
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'UPDATE_CURRENT_USER':
      return { user: action.user };

    case 'SIGNUP_FAILURE':
    case 'LOGIN_FAILURE':
    case 'LOGOUT_FAILURE':
      return { msg: action.err };
    case 'LOGOUT_SUCCESS':
      return { user: {} };
    case 'CLEAR_ERROR':
      return {};
    default:
      return state;
  }
}
