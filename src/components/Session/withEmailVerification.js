import React from 'react';
import PropTypes from 'prop-types';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData.map(provider => provider.providerId).includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false, buttonText: 'Send confirmation E-Mail' };
    }

    onSendEmailVerification = () => {
      this.setState({ buttonText: 'Sending....' });

      const { firebase } = this.props;
      firebase.doSendEmailVerification().then(() => this.setState({ isSent: true }));
    };

    render() {
      const { isSent, buttonText } = this.state;

      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div className="w-full max-w-xl mx-auto mt-24 flex flex-col aligns-center">
                {isSent ? (
                  <div
                    className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div className="flex">
                      <div className="py-1">
                        <svg
                          className="fill-current h-6 w-6 text-teal-500 mr-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold">E-Mail confirmation sent</p>
                        <p className="text-sm">
                          Check you E-Mails (Spam folder included) for a confirmation E-Mail. Refresh this page once you
                          confirmed your E-Mail.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1">
                          <svg
                            className="fill-current h-6 w-6 text-teal-500 mr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold">Verify your E-Mail</p>
                          <p className="text-sm">
                            Check you E-Mails (Spam folder included) for a confirmation E-Mail or send another
                            confirmation E-Mail.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-6"
                      type="button"
                      onClick={this.onSendEmailVerification}
                      disabled={isSent}
                    >
                      {buttonText}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  WithEmailVerification.propTypes = { firebase: PropTypes.instanceOf(Object) };
  WithEmailVerification.defaultProps = { firebase: null };

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
