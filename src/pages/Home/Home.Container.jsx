import { connect } from "react-redux";
import Home from "./Home";

const stateToProps = state => ({
  user: state.user
});

export default connect(
  stateToProps,
  {}
)(Home);
