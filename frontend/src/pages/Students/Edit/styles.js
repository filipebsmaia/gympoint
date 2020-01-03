import styled from 'styled-components';

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 14px;
    color: #444;
    margin: 15px 0 5px;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    height: 35px;
    padding: 0 10px;

    color: #666;

    border: 1px solid #ddd;
    border-radius: 4px;
  }

  div {
    display: flex;
    justify-content: space-between;

    div {
      width: calc(33% - 5px);
      display: initial;
    }
  }
`;
