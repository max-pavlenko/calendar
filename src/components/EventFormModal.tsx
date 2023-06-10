import {ComponentProps, PropsWithChildren} from 'react'
import EventForm from "@/components/EventForm";
import Modal from "@/components/ui/Modal";
import {DateEvent} from "@/types/Event";

type Props = {
   isOpen: boolean,
   onClose: () => void,
} & ComponentProps<typeof EventForm>;

const EventFormModal = <T extends DateEvent>({onSubmit, children, onClose, isOpen, ...props}: PropsWithChildren<Props>) => {

   return (
       <Modal isOpen={isOpen} onClose={onClose}>
          <EventForm<T> onSubmit={onSubmit} {...props}>
             {children}
          </EventForm>
       </Modal>
   );
};

export default EventFormModal;
