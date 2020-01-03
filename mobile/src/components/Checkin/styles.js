import styled from 'styled-components/native';

export const Container = styled.View`
  height: 45px;
  margin: 10px 0 10px;
  padding: 20px;

  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  border: 1px solid #ddd;
`;
export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
`;
