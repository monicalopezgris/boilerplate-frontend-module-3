import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withAuth } from '../lib/AuthProvider';
import ErrorBoundary from '../lib/ErrorBoundary';

const Navbar = styled.div`
  background-color: ${props => props.theme.color.primaryColor};
  display:flex;
  flex-direction: column;
  width:10rem;
  height: 100vh;
`;
const NavAux = styled.div`
display: flex;
flex-direction: column;
`;
const NavBody = styled.div`
display: flex;
flex-direction: column;
`;
const Button = styled.button`
background-color: transparent;
color: white;
font-weight: bold;
font-size:1.2rem;
border: none;
`;
const LogoWrapper = styled.div`
margin: 1rem auto;
width:7rem
height:7rem;
border-radius: 50%;
background-color:white;
display:flex;
align-content: center;
justify-content: center;
`;
const Logo = styled.img`
  width:80%
  height:auto;
`;


class NavBar extends Component {
  // state = {
  //   bill: false,
  //   client: false,
  //   company: false,
  // }

  handleBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  // handleClick = (section) => {
  //   console.log(section)
  //   this.setState(prevState => ({
  //     section: !prevState.section,
  //   }));
  // }

  render() {
    const { logout } = this.props;
    // const { aux } = this.state;
    return (
      <Navbar>
        <Link to="/">
          <LogoWrapper>
            <Logo alt="logo" src="/logo.png" />
          </LogoWrapper>
        </Link>
        <NavAux onClick={this.handleClick}>
          <Button type="button" onClick={this.handleBack}> back </Button>
          <Button onClick={logout}>logout</Button>
          <NavBody>
            {/* <div>Bill</div>
            <Link to="/bill/new">New</Link>
            <Link to="/bill/update">Update</Link>
            <div>Client</div>
            <Link to="/client/new">New</Link>
            <Link to="/client/update">Update</Link> */}
            {/* <button type="button" onClick={() => { this.handleClick('bill'); }}>Bills</button>
            <button type="button" onClick={() => { this.handleClick('client'); }}>Clients</button>
            <button type="button" onClick={() => { this.handleClick('company'); }}>Company</button> */}
          </NavBody>
        </NavAux>
        {/* {
          aux
            ? (
              <NavBody onClick={this.handleClick}>

              </NavBody>
            )
            : <span />
        } */}

        {/* <Switch>
          <NavAux menuDisplay={aux}>
            <PrivateRoute exact path="/bill" component={BillList} />
            <PrivateRoute exact path="/client" component={ClientList} />
            <PrivateRoute exact path="/company" component={CompanyList} />
          </NavAux>
        </Switch> */}
      </Navbar>

    );
  }
}

export default ErrorBoundary(withAuth(NavBar));
