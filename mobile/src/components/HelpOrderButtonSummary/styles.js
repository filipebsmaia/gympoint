import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin: 10px 0 10px;
  padding: 20px;

  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px;
`;

export const AnswerStatus = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const Text = styled.Text`
  color: #666;
  font-size: 13px;
  margin-top: 4px;
`;
