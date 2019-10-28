import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className="w-full max-w-sm mx-auto pt-20">
    <SignInForm />
    <SignUpLink />
    <p className="mt-5 text-center text-gray-500 text-xs">&copy;2019 Sales Pabrik. All rights reserved.</p>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
            <input
              className="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
            <input
              className="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="******************"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={isInvalid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <PasswordForgetLink />
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignInFormBase.propTypes = {
  firebase: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};

SignInFormBase.defaultProps = { firebase: null };

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
