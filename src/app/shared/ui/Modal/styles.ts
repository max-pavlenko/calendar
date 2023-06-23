import styled, {css} from "styled-components";

export const ModalContent = styled.dialog<{ isOpen: boolean }>`
  background-color: #fff;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: min(500px, 100%);
  margin-inline: 10px;
  opacity: 1;

  ${props => !props.isOpen && css`
    opacity: 0;
    visibility: hidden;
  `}
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(1.5px);
  }
`
export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  color: #000;
`
