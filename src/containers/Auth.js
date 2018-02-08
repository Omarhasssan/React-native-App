import { connect } from 'react-redux';
import { Register, clearError, clearForm, Login, updateForm } from '../actions';
import FormRender from '../components/FormRender';

const mapStateToProps = ({ auth, form, nav }) => ({
  auth,
  form,
  nav,
});

const mapDispatchToProps = dispatch => ({
  onRegister(user) {
    dispatch(Register(user));
  },
  onUpdate(formValues) {
    dispatch(updateForm(formValues));
  },
  onLogin(user) {
    dispatch(Login(user));
  },
  onClearError() {
    dispatch(clearError());
  },
  onClearForm() {
    dispatch(clearForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
