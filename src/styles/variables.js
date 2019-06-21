/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components';

export const theme = {
  font: '-apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  fontSize: {
    sm: '0.7rem',
    md: '1.3rem',
    h1: '2rem',
  },
  color: {
    primaryColor: '#f2736a',
    secondaryColor: '#ebe9e9',
  },
};


export const GlobalStyle = createGlobalStyle`
  * {
    // box-sizing: border-box;
    font-family: ${props => props.theme.font};
  }
  #root, .container {
    margin:0;
    padding:0;
    height:93vh;
  }
  label, span{
    font-family: ${props => props.theme.font};
  }
`;


// $breakpoint-sm: 575px;
// $breakpoint-md: 768px;
// $breakpoint-lg: 768px;

// * {
//   
// }