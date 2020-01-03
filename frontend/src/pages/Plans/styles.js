import styled from 'styled-components';

export const PlanTable = styled.table`
  width: 100%;

  th,
  td {
    padding: 15px;
    text-align: left;
  }
  th:nth-child(n + 2):nth-child(-n + 3),
  td:nth-child(n + 2):nth-child(-n + 3) {
    text-align: center;
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

    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 150px;

      a,
      button {
        border: 0;
        background: none;
        color: #de3b3b;

        &:first-child {
          color: #4d85ee;
        }
      }
    }
  }
`;
