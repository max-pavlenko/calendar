import {CSSProperties, FC, ReactNode, useEffect, useState} from 'react'
import styled from "styled-components";
import {createPortal} from "react-dom";

type Props = {
   isOpen: boolean
   onClose: () => void
   children: ReactNode,
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  color: #000;
`

const Modal: FC<Props> = ({isOpen, onClose, children}) => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
      document.body.addEventListener('keydown', handleKeyDown)

      return () => {
         document.body.removeEventListener('keydown', handleKeyDown)
      }
   }, []);

   if (!isClient) {
      return null;
   }
   const modalStyles: CSSProperties = isOpen ? {visibility: 'visible', transform: 'scale(1)', opacity: 1} : {
      visibility: 'hidden',
      transform: 'scale(0.9)',
      opacity: 0
   };

   function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         onClose();
      }
   }

   return createPortal(
       <Overlay style={modalStyles} onClick={onClose}>
          <ModalContent onClick={e => e.stopPropagation()}>
             <ModalCloseButton onClick={onClose}>
                &times;
             </ModalCloseButton>
             {children}
          </ModalContent>
       </Overlay>
       , document.body);
};

export default Modal;
