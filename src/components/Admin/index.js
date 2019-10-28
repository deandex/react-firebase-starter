import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    this.setState({ loading: true });

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>

        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

AdminPage.propTypes = { firebase: PropTypes.instanceOf(Object) };
AdminPage.defaultProps = { firebase: null };

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong>
          {` ${user.uid}`}
        </span>
        <span>
          <strong>E-Mail:</strong>
          {` ${user.email}`}
        </span>
        <span>
          <strong>Username:</strong>
          {` ${user.username}`}
        </span>
      </li>
    ))}
  </ul>
);

UserList.propTypes = { users: PropTypes.instanceOf(Array).isRequired };

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
