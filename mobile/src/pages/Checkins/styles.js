import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  max-height: 520px;
`;

export const CheckinView = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin: 5px 0 20px;
`;
