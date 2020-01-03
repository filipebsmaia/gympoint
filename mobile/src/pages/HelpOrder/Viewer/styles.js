import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  margin: 20px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  margin: 30px 0 0px;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
  margin-top: 4px;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 13px;
`;

export const Text = styled.Text`
  color: #666;
  font-size: 13px;
  margin: 10px 0 30px;
`;
