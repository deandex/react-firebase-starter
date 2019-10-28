import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import Logo from '../../assets/logo-salespabrik-transparant.png';

const Navigation = () => (
  <nav className="flex items-center justify-between flex-wrap bg-teal-500 px-8 py-4">
    <div className="flex items-center flex-shrink-0 text-white w-32 h-8">
      <Link className="mr-10" to={ROUTES.LANDING}>
        <img src={Logo} alt="" />
      </Link>
    </div>
    <div className="block lg:hidden">
      <button
        type="button"
        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div className="w-full hidden lg:block flex-grow lg:flex lg:items-center lg:w-auto">
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  </nav>
);

const NavigationAuth = ({ authUser }) => (
  <>
    <div className="text-sm lg:flex-grow">
      <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to={ROUTES.PRODUCT}>
        Produk
      </Link>
      <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to={ROUTES.CATEGORY}>
        Kategori
      </Link>
      <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to={ROUTES.ACCOUNT}>
        Account
      </Link>
      {!!authUser.roles[ROLES.ADMIN] && (
        <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to={ROUTES.ADMIN}>
          Admin
        </Link>
      )}
    </div>
    <div>
      <SignOutButton />
    </div>
  </>
);

NavigationAuth.propTypes = { authUser: PropTypes.instanceOf(Object).isRequired };

const NavigationNonAuth = () => (
  <>
    <div className="lg:flex-grow text-right">
      <Link
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        to={ROUTES.SIGN_IN}
      >
        Sign In
      </Link>
    </div>
  </>
);

export default Navigation;
