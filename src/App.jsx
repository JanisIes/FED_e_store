import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "./Components/InputGroup";
import ButtonComponent from "./Components/ButtonComponent";
import registerUser from "./Action/userAction";
import { async } from "q";

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    emailConfirmation: "",
    password: "",
    isError: false
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  onSubmit = async event => {
    event.preventDefault();
    let isError = false;
    for (const val in this.state) {
      if (this.state[val].length < 1) {
        this.setState({
          [`is_error_${val}`]: true
        });
        isError = true;
      }
    }
    if (isError) {
      return;
    }
    const user = await registerUser(this.state);
    this.setState({user});
  };

  render() {
    const {user} = this.state;
    return (
      <div>
      {!user ? (
        <div className="row">
          <div className="col">
            <h3>GitLab.com</h3>
            <p>
              GitLab.com offers free unlimited (private) repositories and
              unlimited collaborators.
            </p>
            <p>Explore projects on GitLab.com (no login needed)</p>
            <p>More information about GitLab.com</p>
            <p>GitLab.com Support Forum</p>
            <p>GitLab Homepage</p>
            <p>
              By signing up for and by signing in to this service you accept
              our:
            </p>
            <p>Privacy policy</p>
            <p>GitLab.com Terms.</p>
          </div>
          <div className="col">
            <form method="post" onSubmit={this.onSubmit}>
              <InputGroup
                name="firstName"
                isError={this.state.is_error_firstName}
                labelName="First name"
                eventHandler={this.onChange}
              />
              <InputGroup
                name="lastName"
                isError={this.state.is_error_lastName}
                labelName="Last name"
                eventHandler={this.onChange}
              />
              <InputGroup
                name="email"
                isError={this.state.is_error_email}
                labelName="Email"
                inputType="email"
                eventHandler={this.onChange}
              />
              <InputGroup
                name="emailConfirmation"
                isError={this.state.is_error_emailConfirmation}
                labelName="Email Confirmation"
                inputType="email"
                eventHandler={this.onChange}
              />
              <InputGroup
                name="password"
                isError={this.state.is_error_password}
                labelName="Password"
                inputType="password"
                eventHandler={this.onChange}
              />
              <ButtonComponent title="Submit" color="success" size="sm" />
            </form>
          </div>
        </div>
        ) : (
          <div>
          {user.isError ? "Error" : (
            <div>
            <p>
              <i>First Name</i>
              {user.firstName}
            </p>
            <p>
              <i>Last Name</i>
              {user.lastName}
            </p>
            <p>
              <i>Email</i>
              {user.email}
            </p>
            <p>
              <i>Registered </i>
              {user.createdAt}
            </p>
            </div>
          )}</div>
        )}
      </div>
    );
  }
}
export default App;
