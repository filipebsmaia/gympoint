import styled, {createGlobalStyle} from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root{
    height: 100%;
  }

  body {
    -webkit-font-smoothin: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  border: 0;
  background: none;
  background-color: ${props => props.color} !important;
  color: #fff;
  height: 35px;
  border-radius: 4px;
  margin: 0 10px;
`;

export const ContentDiv = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  border: 0;
  border-radius: 4px;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 24px;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  button {
    background-color: #ee4d64;
    border: 0;
    border-radius: 4px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 35px;
  }

  form {
    margin: 0 15px;
    display: flex;
    align-items: center;

    svg {
      margin: 0 10px;
      position: absolute;
    }

    input {
      height: 35px;
      width: 235px;
      padding: 0 35px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
`;
