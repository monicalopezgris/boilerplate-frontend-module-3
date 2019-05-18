import React, { Component } from 'react';
import { Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { withAuth } from '../lib/AuthProvider';
import PrivateRoute from './PrivateRoute';
import BillList from './bill/BillList';
import ClientList from './clients/ClientList';
import CompanyList from './company/CompanyList';

const Navbar = styled.div`
  background-color: ${props => props.theme.color.primaryColor};
  display:flex;
  flex-direction: column;
  height: 5vh;
`;
const NavAux = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
const NavBody = styled.div`
background-color: ${props => props.theme.color.primaryColor};
position:fixed;
top:5vh;
right:0;
left:0;
height:95vh;
display: flex;
flex-direction: column;
`;
const Button = styled.button`
background-color: transparent;
color: white;
font-weight: bold;
border: none;
`;

class NavBar extends Component {
  state = {
    // menu: false,
    aux: false,
  }

  handleBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  handleClick = () => {
    this.setState(prevState => ({
      aux: !prevState.aux,
    }));
  }

  render() {
    const { logout } = this.props;
    const { aux } = this.state;
    return (
      <Navbar>
        <NavAux>
          <Button type="button" onClick={this.handleBack}> back </Button>
          <img alt="logo" onClick={this.handleClick} src="/logo_sm.png" />
          <Button onClick={logout}>logout</Button>
        </NavAux>
        {
          aux
            ? (
              <NavBody onClick={this.handleClick}>
                <Link to="/bill">Bills</Link>
                <Link to="/client">Clients</Link>
                <Link to="/company">Company</Link>
              </NavBody>
            )
            : <span />
        }

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

export default withAuth(NavBar);
