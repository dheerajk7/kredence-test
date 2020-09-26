import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        username: "",
        password: "",
      },
      userList: [
        { id: 123, username: "admin", password: "admin" },
        { id: 321, username: "test", password: "test123" },
      ],
    };
  }

  handleChange = (e) => {
    let label = e.target.id;
    let value = e.target.value;

    if (label === "username") {
      this.setState({
        formInput: { ...this.state.formInput, username: value },
      });
    } else if (label === "password") {
      this.setState({
        formInput: { ...this.state.formInput, password: value },
      });
    }
  };

  handleLogIn = (e) => {
    e.preventDefault();
    const { username, password } = this.state.formInput;
    const { userList } = this.state;
    for (let user of userList) {
      if (user.username === username.toLowerCase()) {
        if (user.password === password.toLowerCase()) {
          this.props.setLoggedInToTrue(user.id);
        }
      }
    }
  };

  render() {
    const { username, password } = this.state.formInput;
    return (
      <div className="login-container">
        <div className="heading">Login</div>
        <form>
          <div className="form-item">
            <label>User Name :</label>
            <input
              type="text"
              placeholder="User Name"
              id="username"
              onChange={this.handleChange}
              value={username}
            />
          </div>
          <div className="form-item">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <button className="btn" type="submit" onClick={this.handleLogIn}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
