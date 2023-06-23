import Calendar from "react-calendar";
import {OnChangeFunc, TileContentFunc} from "react-calendar/src/shared/types";
import {useRef, useState} from "react";
import {BaseDateEvent, DateEvent} from "@/types/Events";
import {captureScreenshot} from "@/utils/captureScreenshot";
import {exportAsJSON} from "@/utils/exportAsJSON";
import {ExportValues, importEvents} from "@/utils/importEvents";
import ColoredLabels from "@/store/ColoredLabels";
import styled from "styled-components";
import {SearchLabelOption} from "@/types/Labels";
import {EventFormSubmitHandler} from "@/app/features/calendar/components/EventForm";
import CalendarTileContent, {
   DropDateEventOnDateEventHandler,
   DropDateEventOnDayHandler
} from "@/app/features/calendar/components/CalendarTileContent";
import Input from "@/app/shared/ui/Input";
import Dropdown from "@/app/shared/ui/Dropdown";
import Button from "@/app/shared/ui/Button";
import EventFormModal from "@/app/features/calendar/components/EventFormModal";

const OptionButton = styled.button`
  background-color: transparent;
  border-radius: 4px;
  font-size: 14px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 9px;
`;

export default function Home() {
   const [isCreateEventModalVisible, setIsCreateEventModalVisible] = useState(false);
   const [isEditEventModalVisible, setIsEditEventModalVisible] = useState(false);
   const [dateEvents, setDateEvents] = useState<DateEvent[]>([]);
   const [selectedDateEvent, setSelectedDateEvent] = useState<DateEvent>();
   const [dateEventSearchQuery, setDateEventSearchQuery] = useState("");
   const [dateEventFilterLabel, setDateEventFilterLabel] = useState<SearchLabelOption | null>(null);
   const selectedDateRef = useRef(new Date());
   const importDateEventsInputRef = useRef<HTMLInputElement>(null);

   const handleCreateEventFormSubmit: EventFormSubmitHandler<BaseDateEvent> = (formValues) => {
      setIsCreateEventModalVisible(false);
      setDateEvents(prevEvents => [
         ...prevEvents,
         {
            ...formValues,
            date: selectedDateRef.current,
            id: crypto.randomUUID(),
         },
      ]);
   };

   const handleEditEventFormSubmit: EventFormSubmitHandler<DateEvent> = (editedDateEvent) => {
      const newEvents = [...dateEvents];
      const indexOfEditedEvent = newEvents.findIndex(event => event.id === editedDateEvent.id);
      if (indexOfEditedEvent === -1) return;
      newEvents[indexOfEditedEvent] = {...newEvents[indexOfEditedEvent], ...editedDateEvent};

      setDateEvents(newEvents);
      handleEditEventModalClose();
   };

   const handleDayClick: OnChangeFunc = (date: Date) => {
      selectedDateRef.current = date;
      setIsCreateEventModalVisible(true);
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

   const handleDeleteDateEvent = (event: DateEvent) => setDateEvents(prevState => prevState.filter(ev => ev.id !== event.id));

   const handleOnDayDrop: DropDateEventOnDayHandler = ({date, event}) => {
      const newEvents = [...dateEvents];
      const indexOfDate = dateEvents.findIndex(ev => ev.id === event.id);
      newEvents[indexOfDate] = {...newEvents[indexOfDate], date};
      setDateEvents(newEvents);
   };

   const handleImportDateEventsClick = () => {
      importDateEventsInputRef.current!.click();
   };

   const handleSuccessfulImport = ({events, coloredLabels}: ExportValues) => {
      ColoredLabels.setLabelColors = coloredLabels;
      setDateEvents(events);
      importDateEventsInputRef.current!.value = "";
   };

   const handleOnDateEventDrop: DropDateEventOnDateEventHandler = ({eventOnDropped, currentlyDraggedEvent}) => {
      const newEvents = [...dateEvents];

      if (eventOnDropped.date.toDateString() !== currentlyDraggedEvent.date.toDateString()) {
         currentlyDraggedEvent.date = eventOnDropped.date;
      }

      const currentlyDraggedEventIdx = newEvents.findIndex(event => event.id === currentlyDraggedEvent.id);
      const droppedOnEventIdx = newEvents.findIndex(event => event.id === eventOnDropped.id);
      const idxToInsert = droppedOnEventIdx + (droppedOnEventIdx >= currentlyDraggedEventIdx ? 1 : 0);

      newEvents.splice(currentlyDraggedEventIdx, 1);
      newEvents.splice(idxToInsert, 0, currentlyDraggedEvent);

      setDateEvents(newEvents);
   };

   const dropdownLabelsOptions: SearchLabelOption[] = [
      {value: "", label: "Search with label"},
      ...Object.entries(ColoredLabels.getLabelColors).map(([id, {label}]) => ({value: id, label}))
   ];

   const filteredEvents = dateEvents.filter(event => {
      const filterByLabels = !dateEventFilterLabel?.value || event.labels.some(label => label === dateEventFilterLabel?.value);
      return event.name.toLowerCase().includes(dateEventSearchQuery.toLowerCase()) && filterByLabels;
   });

   const renderCalendarCell: TileContentFunc = (props) =>
       <CalendarTileContent onEventDrop={handleOnDateEventDrop} onDayDrop={handleOnDayDrop} onDeleteEventClick={handleDeleteDateEvent}
                            onEventClick={handleDateEventClick} events={filteredEvents} {...props} />;

   return (
       <main>
          <ActionsWrapper>
             <Input placeholder="Search tasks..." value={dateEventSearchQuery} onChange={(e) => setDateEventSearchQuery(e.target.value)}/>
             <Dropdown selectedOption={dateEventFilterLabel} onChange={(option) => setDateEventFilterLabel(option)} options={dropdownLabelsOptions}
                       renderOption={({label}) => <OptionButton>{label}</OptionButton>}/>
             <Button onClick={() => captureScreenshot(document.querySelector(".react-calendar")!, "my_calendar")}>
                Download
             </Button>
             <Button onClick={() => exportAsJSON({events: dateEvents, coloredLabels: ColoredLabels.getLabelColors})}>Export</Button>
             <Button onClick={handleImportDateEventsClick}>Import</Button>
             <input onChange={e => importEvents(e.target.files![0], handleSuccessfulImport)}
                    ref={importDateEventsInputRef} type="file" style={{display: "none"}} accept=".json"/>
          </ActionsWrapper>

          <Calendar showFixedNumberOfWeeks onClickDay={handleDayClick} tileContent={renderCalendarCell}/>

          <EventFormModal isOpen={isCreateEventModalVisible} onClose={handleCreateEventModalClose} onSubmit={handleCreateEventFormSubmit}>
             <div style={{marginBottom: 10}}>
                Selected date: <time>{selectedDateRef.current.toDateString()}</time>
             </div>
          </EventFormModal>
          <EventFormModal<DateEvent> defaultValues={selectedDateEvent} isOpen={isEditEventModalVisible} onClose={handleEditEventModalClose} onSubmit={handleEditEventFormSubmit}>
             <div style={{marginBottom: 10}}>
                Edit Selected date: <time>{selectedDateEvent?.date.toDateString()}</time>
             </div>
          </EventFormModal>
       </main>
   );
}
