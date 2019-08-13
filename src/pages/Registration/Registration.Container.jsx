import { connect } from "react-redux";
import Registration from "./Registration";
import { registerUser } from "./Registration.Action";

const stateToProps = state => ({
  user: state.user
});

export default connect(
  stateToProps,
  { registerUser }
)(Registration);
