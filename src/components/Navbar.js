import React from 'react';
import { Link } from 'react-router-dom';
// import { withAuth } from '../lib/AuthProvider';

const NavBar = ({ logout, isLoggedin }) => {
  return (
    <div>
      {isLoggedin ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/dash">Signup</Link>
        </>
      )}
    </div>
  );
};
export default NavBar;
