import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withAuth } from '../lib/AuthProvider';

const Navbar = styled.div`
    background-color: ${props => props.theme.color.primaryColor};
    display:flex;
    justify-content: space-between;
    height: 5vh;
  `;
const Button = styled.button`
  background-color: transparent;
  color:white;
  font-weight: bold;
  border:none;
`;


const NavBar = ({ logout, isLoggedin, history }) => {
  const handleBack = () => {
    history.go(-1);
  };

  return (
    <Navbar>
      {isLoggedin ? (
        <>
          <Button type="button" onClick={handleBack}> back </Button>
          <img alt="logo" src="/logo_sm.png" />
          <Button onClick={logout}>logout</Button>
        </>
      ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <button type="button"> Logout</button>
          </>
        )}
    </Navbar>
  );
};
export default withAuth(NavBar);
