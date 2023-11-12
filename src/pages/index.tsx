import {OnChangeFunc} from 'react-calendar/src/shared/types';
import {useRef, useState} from 'react';
import {BaseEvent, DateEvent} from '@/app/features/events/types/event';
import EventFormModal from '../app/features/events/components/event-form-modal';
import {EventFormSubmitHandler} from '@/app/features/events/types/event-form';
import CalendarFilters from '@/app/features/calendar/components/calendar-filters-form';
import EventsStore from '@/app/features/calendar/model/events.store';
import CalendarTransfer from '../app/features/calendar/components/calendar-transfer-actions';
import {observer} from 'mobx-react-lite';
import CalendarGrid from '../app/features/calendar/components/calendar-grid';

export default observer(function Home() {
   const [isCreateEventModalVisible, setIsCreateEventModalVisible] = useState(false);
   const [isEditEventModalVisible, setIsEditEventModalVisible] = useState(false);
   const [selectedDateEvent, setSelectedDateEvent] = useState<DateEvent>();
   const selectedDateRef = useRef(new Date());
   
   const handleCreateEventFormSubmit: EventFormSubmitHandler<BaseEvent> = (formValues) => {
      setIsCreateEventModalVisible(false);
      EventsStore.addEvent({
         ...formValues,
         date: selectedDateRef.current,
         id: crypto.randomUUID(),
      });
   };
   
   const handleEditEventFormSubmit: EventFormSubmitHandler<DateEvent> = (editedDateEvent) => {
      EventsStore.patchEvent(editedDateEvent);
      handleEditEventModalClose();
   };
   
   function handleCreateEventModalClose() {
      setIsCreateEventModalVisible(false);
   }
   
   function handleEditEventModalClose() {
      setIsEditEventModalVisible(false);
   }
   
   const handleDateEventClick = (event: DateEvent) => {
      setSelectedDateEvent(event);
      setIsEditEventModalVisible(true);
   };
   
   const handleDayClick: OnChangeFunc = (date) => {
      selectedDateRef.current = date;
      setIsCreateEventModalVisible(true);
   };
   
   return (
       <main>
          <CalendarFilters>
             <CalendarTransfer/>
          </CalendarFilters>
          <CalendarGrid onDayClick={handleDayClick} onEventClick={handleDateEventClick}/>
          
          <EventFormModal isOpen={isCreateEventModalVisible} onClose={handleCreateEventModalClose} onSubmit={handleCreateEventFormSubmit}>
             <div>
                Selected date: <time>{selectedDateRef.current.toDateString()}</time>
             </div>
          </EventFormModal>
          <EventFormModal<DateEvent> defaultValues={selectedDateEvent} isOpen={isEditEventModalVisible} onClose={handleEditEventModalClose}
                                     onSubmit={handleEditEventFormSubmit}>
             <div>
                Edit Selected date: <time>{selectedDateEvent?.date.toDateString()}</time>
             </div>
          </EventFormModal>
       </main>
   );
});
