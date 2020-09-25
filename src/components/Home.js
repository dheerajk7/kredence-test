import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.dropdown = React.createRef();
    this.state = {
      isTaskPageActive: false,
      activeItem: "React",
      list: [
        {
          title: "Book",
          detail:
            "A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.[1] The technical term for this physical arrangement is codex (plural, codices). In the history of hand-held physical supports for extended written compositions or records, the codex replaces its predecessor, the scroll. A single sheet in a codex is a leaf and each side of a leaf is a page.",
        },
        {
          title: "React",
          detail:
            "React (also known as React.js or ReactJS) is an open-source JavaScript library[3] for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with rendering data to the DOM, and so creating React applications usually requires the use of additional libraries for state management and routing.[7][8] Redux[9] and React Router[10] are respective examples of such libraries",
        },
        {
          title: "Node JS",
          detail:
            "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a 'JavaScript everywhere' paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server- and client-side scripts",
        },
      ],
    };
  }

  handleHomeClick = () => {
    this.setState({ isTaskPageActive: false });
  };

  handleTaskClick = () => {
    this.setState({ isTaskPageActive: true });
  };

  handleLogout = () => {
    this.props.setLoggedInToFalse();
  };

  handleChange = () => {
    this.setState({ activeItem: this.dropdown.current.value });
  };

  render() {
    const { list, activeItem, isTaskPageActive } = this.state;
    let detail = "";
    for (let l of list) {
      if (l.title === activeItem) {
        detail = l.detail;
      }
    }
    return (
      <div className="home-container">
        <div className="navbar">
          <div>
            <span className="nav-menu" onClick={this.handleHomeClick}>
              Home
            </span>
          </div>
          <div>
            <span className="nav-menu" onClick={this.handleTaskClick}>
              Task
            </span>
            <span className="nav-menu" onClick={this.handleLogout}>
              Logout
            </span>
          </div>
        </div>
        {isTaskPageActive ? (
          <div className="task-container">
            <div className="task-heading">Tasks</div>
          </div>
        ) : (
          <div className="dropdown-container">
            <label for="items" className="label">
              Choose a Item :
            </label>
            <select
              name="items"
              id="items"
              ref={this.dropdown}
              onChange={this.handleChange}
            >
              <option value="React">React</option>
              <option value="Book">Book</option>
              <option value="Node JS">Node JS</option>
            </select>
            <div className="text">{detail}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
