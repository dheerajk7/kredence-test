import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    // managing login status and logged in user's id
    this.state = {
      isLoggedIn: false,
      activeUserId: null,
    };
  }

  // to login the user in system when username and password are correct
  setLoggedInToTrue = (id) => {
    this.setState({ isLoggedIn: true, activeUserId: id });
  };

  // logout user
  setLoggedInToFalse = () => {
    this.setState({ isLoggedIn: false, activeUserId: null });
  };

  render() {
    // rendering components based on login status
    const { isLoggedIn, activeUserId } = this.state;
    return (
      <div className="App">
        {isLoggedIn ? (
          <Home
            setLoggedInToFalse={this.setLoggedInToFalse}
            isLoggedIn={this.isLoggedIn}
          />
        ) : (
          <Login
            setLoggedInToTrue={this.setLoggedInToTrue}
            isLoggedIn={isLoggedIn}
            userID={activeUserId}
          />
        )}
      </div>
    );
  }
}

export default App;
