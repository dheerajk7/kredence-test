import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    // reference to dropdown on home
    this.dropdown = React.createRef();
    // the task id from which new task should be added with these id
    this.currentTaskId = 201;
    // state to manage task related things
    // showing add task option
    // showing task list after getting it from API
    // active item in dropdown
    // managing form input for adding new task
    this.state = {
      isTaskPageActive: false,
      showAddTask: false,
      taskList: [],
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
      formInput: {
        title: "",
      },
    };
  }

  componentDidMount() {
    this.fetchTaskFromAPI();
  }

  // function to fetch list of task from API
  fetchTaskFromAPI = () => {
    fetch("http://jsonplaceholder.typicode.com/todos", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ taskList: data });
      });
  };

  // showing of clicking on home button in Navbar
  handleHomeClick = () => {
    this.setState({ isTaskPageActive: false });
  };

  // showing task list on clicking task button in navbar
  handleTaskClick = () => {
    this.setState({ isTaskPageActive: true });
  };

  // logging out user on clicking logout button
  handleLogout = () => {
    this.props.setLoggedInToFalse();
  };

  // showing add task option on clicking add task
  handleTaskButton = () => {
    this.setState({ showAddTask: !this.state.showAddTask });
  };

  // handling item change in dropdown menu
  handleChange = () => {
    this.setState({ activeItem: this.dropdown.current.value });
  };

  // deleting task with id
  handleDelete = (id) => {
    let taskList = this.state.taskList;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        taskList.splice(i, 1);
      }
    }
    this.setState({ taskList: taskList });
  };

  // handle input change for addding new item in task
  handleInputChange = (e) => {
    this.setState({
      formInput: {
        title: e.target.value,
      },
    });
  };

  // adding new task in list with task id
  addNewTask = (e) => {
    e.preventDefault();
    const { title } = this.state.formInput;
    const { taskList } = this.state;
    if (title.length === 0) {
      return;
    }
    // creating new task
    let task = {
      id: this.currentTaskId,
      title,
      completed: false,
      userId: this.props.userID,
    };

    // adding new task
    let newTaskList = [task, ...taskList];
    this.currentTaskId++;
    this.setState({
      taskList: newTaskList,
      showAddTask: false,
      formInput: {
        title: "",
      },
    });
  };

  // rendering home component
  render() {
    const {
      list,
      activeItem,
      isTaskPageActive,
      taskList,
      showAddTask,
    } = this.state;
    const { title } = this.state.formInput;
    let detail = "";
    for (let l of list) {
      if (l.title === activeItem) {
        detail = l.detail;
      }
    }
    let count = 1;
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
            <div className="add-task-container">
              <button
                className="add-task-button"
                onClick={this.handleTaskButton}
              >
                {showAddTask ? "Cancle" : "Add Task"}
              </button>
              {showAddTask && (
                <form className="add-task-form">
                  <div className="input-group">
                    <label>Title :</label>
                    <input
                      type="text"
                      placeholder="Title"
                      id="titile"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <button className="add-task-button" onClick={this.addNewTask}>
                    Add
                  </button>
                </form>
              )}
            </div>
            <div className="task-list-container">
              <table className="table">
                <tr className="table-header row">
                  <th>S. No</th>
                  <th>Title</th>
                  <th>Completed</th>
                  <th></th>
                </tr>
                {taskList.map((task) => {
                  return (
                    <tr className="row" key={task.id}>
                      <td>{count++}</td>
                      <td>{task.title}</td>
                      <td>{task.completed ? "True" : "False"}</td>
                      <td>
                        <button
                          id={task.id}
                          onClick={() => {
                            this.handleDelete(task.id);
                          }}
                          className="task-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
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
