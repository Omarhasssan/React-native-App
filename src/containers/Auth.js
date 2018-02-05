import { connect } from 'react-redux';
import { saveUser, updateForm } from '../actions';
import FormRender from '../components/FormRender';

const mapStateToProps = ({ auth, form }) => ({
  auth,
  form,
});

const mapDispatchToProps = dispatch => ({
  onRegister(user) {
    dispatch(saveUser(user));
  },
  onUpdate(formValues) {
    dispatch(updateForm(formValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
