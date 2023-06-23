import {FC, MouseEventHandler, ReactEventHandler, ReactNode, useEffect, useRef} from 'react'
import {CloseButton, ModalContent} from "@/app/shared/ui/Modal/styles";

type Props = {
   isOpen: boolean,
   onClose: () => void | ReactEventHandler<HTMLDialogElement>,
   children: ReactNode,
};

const Modal: FC<Props> = ({isOpen, onClose, children}) => {
   const modalDialogRef = useRef<HTMLDialogElement>(null!);

   useEffect(() => {
      isOpen ? modalDialogRef.current.showModal() : modalDialogRef.current.close();
   }, [isOpen])

   const handleModalClick: MouseEventHandler<HTMLDialogElement> = (event) => {
      const rect = modalDialogRef.current.getBoundingClientRect();
      const isClickedOnBackdrop = event.clientY < rect.top || event.clientY > rect.bottom ||
          event.clientX < rect.left || event.clientX > rect.right;
      if (isClickedOnBackdrop) {
         modalDialogRef.current.close();
      }
   };

   return (
       <ModalContent onClick={handleModalClick} onClose={onClose} isOpen={isOpen} ref={modalDialogRef}>
          <CloseButton onClick={onClose}>
             &times;
          </CloseButton>
          {children}
       </ModalContent>
   );
};

export default Modal;
