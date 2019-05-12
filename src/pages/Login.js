import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { loginSchema } from '../lib/validationSchemas';
import { withAuth } from '../lib/AuthProvider';

const Wrapper = styled.div`
  background-color: ${props => props.theme.color.secondaryColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.img`
  margin:-20% auto 20% auto;
`;
const Formu = styled(Form)`
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  margin: 0 15% 0 15%;
  color: black;
`;
const Label = styled.label`
  text-align: center;
  margin: 5% 0;
`;
const Fieldu = styled(Field)`
  border-radius: 10px;
  border: 2px solid transparent;
  font-size: 1.3rem;
  text-align: center;
  &: hover{
    border-color: ${props => props.theme.color.primaryColor};
  }
  &: focus{
    border-color: ${props => props.theme.color.primaryColor};
  }
  padding: 3% 5%;
`;

const Button = styled.button`
  color: white;
  // font-weight: bold;
  padding:0.8rem;
  margin: auto;
  margin-top: 10%;
  border:none;
  border-radius: 100%;
  background-color: ${props => props.theme.color.primaryColor};
`;

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSubmit = (values) => {
    const { login } = this.props;
    login(values);
  }

  render() {
    const { username, password } = this.state;
    return (
      <Wrapper>
        <Logo alt="logo" src="/logo.png" />
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            this.handleSubmit(values);
          }}
          render={({ values }) => (
            <Formu>
              <Label>Username</Label>
              <Fieldu
                type="text"
                name="username"
                placeholder="username"
              />
              <ErrorMessage name="username" />
              <Label>Password</Label>
              <Fieldu
                type="password"
                name="password"
                placeholder="password"
              />
              <ErrorMessage name="password" />
              <Button type="submit">Go</Button>
            </Formu>
          )}
        />
      </Wrapper>
    );
  }
}

export default withAuth(Login);
