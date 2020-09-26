import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      activeUserId: null,
    };
  }

  setLoggedInToTrue = (id) => {
    this.setState({ isLoggedIn: true, activeUserId: id });
  };

  setLoggedInToFalse = () => {
    this.setState({ isLoggedIn: false, activeUserId: null });
  };

  render() {
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
