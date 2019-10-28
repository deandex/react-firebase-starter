import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import ProductPage from '../Product';
import CategoryPage from '../Category';
import CategoryCreatePage from '../Category/Action/create';
import CategoryEditPage from '../Category/Action/edit';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <Navigation />
    <div className="bg-gray-100 h-screen px-8 py-6">
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.PRODUCT} component={ProductPage} />
        <Route path={ROUTES.CATEGORY_EDIT} component={CategoryEditPage} />
        <Route path={ROUTES.CATEGORY_CREATE} component={CategoryCreatePage} />
        <Route path={ROUTES.CATEGORY} component={CategoryPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);
