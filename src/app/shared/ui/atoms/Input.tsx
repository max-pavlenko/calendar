import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
   ...props
}))`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export default Input;
