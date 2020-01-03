import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  display: flex;
  flex-direction: column;

  padding: 0 15px 20px;
  margin: 20px;
`;

export const TextArea = styled(Input)`
  flex: 1;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-height: 330px;
`;

export const SubmitButton = styled(Button)`
  margin: 20px 0 20px;
`;
