import React from 'react';
import PropTypes from 'prop-types';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  WithAuthentication.propTypes = { firebase: PropTypes.instanceOf(Object) };
  WithAuthentication.defaultProps = { firebase: null };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
