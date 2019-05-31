import React from "react";
import { Link } from "react-router-dom";
import { userService } from "../_services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      users: { loading: true }
    });
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { user, users } = this.state;
    return (
      <div className="col-md-12 col-md-offset-3">
        <h1>Welcome {user.firstName}!</h1>
        <p>You're logged in with React & Basic HTTP Authentication!!</p>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.length && (
          <ul
            style={{ marginLeft: "20px", fontSize: "20px", color: "#F4A643" }}
          >
            {users.map((user, index) => (
              <li key={user.id}>{user.firstName + " " + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          <Link style={{ color: "#F443A3" }} to="/login">
            Logout
          </Link>
        </p>
      </div>
    );
  }
}

export { HomePage };
