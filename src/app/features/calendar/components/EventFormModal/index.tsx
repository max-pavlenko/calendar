import {ComponentProps, PropsWithChildren} from 'react'
import {DateEvent} from "@/types/Events";
import EventForm from "@/app/features/calendar/components/EventForm";
import Modal from "@/app/shared/ui/Modal";

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
