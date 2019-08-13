import axios from "axios";
import { success, error } from "react-notification-system-redux";

const registerUser = user => dispatch => {
  axios
    .post("/auth/users", user)
    .then(response => {
      if (response && response.status === 200) {
        dispatch(
          success({
            title: "Registration success!",
            message: "Check your email",
            position: "tc",
            autoDismiss: 5
          })
        );
      }
    })
    .catch(err => {
      console.log(err.response);
      dispatch(
        error({
          title: "Registration failed!",
          message: err.response.data.error,
          position: "tc",
          autoDismiss: 5
        })
      );
    });
};

export { registerUser };
