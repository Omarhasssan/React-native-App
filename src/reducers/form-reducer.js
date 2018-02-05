const intialstate = {
  name: '',
  password: '',
  mobilenumber: '',
};
export default function (state = intialstate, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...state, ...action.formValues };
    default:
      return state;
  }
}
