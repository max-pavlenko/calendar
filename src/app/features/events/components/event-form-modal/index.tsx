import {ComponentProps, PropsWithChildren} from 'react';
import {DateEvent} from '@/app/features/events/types/event';
import EventForm from '../event-form';
import Modal from '../../../../shared/ui/atoms/modal';

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
