export const updateForm = formValues => (dispatch) => {
  dispatch({ type: 'UPDATE_FORM', formValues });
};
export const clearForm = () => (dispatch) => {
  dispatch({ type: 'CLEAR_FORM' });
};
