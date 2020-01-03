import styled from 'styled-components';

export const HelpOrderTable = styled.table`
  width: 100%;

  th,
  td {
    padding: 15px;
    text-align: left;
    &:first-child {
      width: 85%;
    }
  }

  th {
    color: #444;
    text-transform: uppercase;
  }
  td {
    color: #666;
  }

  tbody tr td {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;

    button {
      border: 0;
      background: none;
      color: #4d85ee;
    }
  }
`;

export const ReplyContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => (props.visible ? 'block' : 'none')};

  div {
    position: absolute;
    display: flex;
    flex-direction: column;

    width: 500px;
    left: calc(50% - 250px);
    top: 250px;

    background: #fff;
    border: 0;
    border-radius: 4px;
    padding: 25px;

    strong {
      font-size: 16px;
      text-transform: uppercase;
      color: #444;
      margin: 0 0 10px;
    }

    p {
      font-size: 14px;
      color: #666;
      margin: 0 0 20px;
    }

    textarea {
      border: 1px solid #eee;
      border-radius: 4px;
      min-height: 140px;
      max-width: 100%;
      min-width: 100%;
      margin: 0 0 10px;
    }

    button {
      margin: 0;
      padding: 0;
      font-weight: bold;
      text-transform: uppercase;
      height: 50px;
    }
  }
`;
