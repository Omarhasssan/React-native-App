export const updateForm = formValues => (dispatch) => {
  dispatch({ type: 'UPDATE_FORM', formValues });
};
