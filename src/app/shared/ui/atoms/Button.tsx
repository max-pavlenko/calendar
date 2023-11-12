import styled from 'styled-components';

const Button = styled.button.attrs(props => ({
   ...props
}))`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  background-color: var(--blue);
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default Button;
