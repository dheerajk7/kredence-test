import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  setLoggedInToTrue = () => {
    this.setState({ isLoggedIn: true });
  };

  setLoggedInToFalse = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
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
          />
        )}
      </div>
    );
  }
}

export default App;
