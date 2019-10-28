import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        },
        () => history.push(ROUTES.SIGN_IN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (condition(authUser) ? <Component authUser={authUser} {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    firebase: PropTypes.instanceOf(Object),
    history: PropTypes.instanceOf(Object).isRequired,
  };
  WithAuthorization.defaultProps = { firebase: null };

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
