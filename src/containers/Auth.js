import { connect } from 'react-redux';
import { Register, clearError, Login } from '../actions';
import FormRender from '../components/FormRender';

const mapStateToProps = ({ auth, nav }) => ({
  auth,
  nav,
});

const mapDispatchToProps = dispatch => ({
  onRegister(user) {
    dispatch(Register(user));
  },

  onLogin(user) {
    dispatch(Login(user));
  },
  onClearError() {
    dispatch(clearError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
