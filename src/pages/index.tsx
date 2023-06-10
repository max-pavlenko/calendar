import Calendar from "react-calendar";
import {OnChangeFunc} from "react-calendar/src/shared/types";
import {useRef, useState} from "react";
import {EventFormHandler} from "@/components/EventForm";
import {DateEvent, TEvent} from "@/types/Event";
import TileContent, {DayDropHandler, EventDropHandler} from "@/components/TileContent";
import EventFormModal from "@/components/EventFormModal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {captureScreenshot} from "@/utils/captureScreenshot";
import {exportEvents} from "@/utils/exportEvents";
import {ExportValues, importEvents} from "@/utils/importEvents";
import ColoredLabels from "@/store/ColoredLabels";
import Dropdown from "@/components/ui/Dropdown";
import styled from "styled-components";
import {SearchLabelOption} from "@/types/Label";

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
   const [events, setEvents] = useState<DateEvent[]>([]);
   const [selectedEvent, setSelectedEvent] = useState<DateEvent>();
   const selectedDateRef = useRef(new Date());
   const [searchQuery, setSearchQuery] = useState("");
   const [searchLabel, setSearchLabel] = useState<SearchLabelOption | null>(null);
   const importFileInputRef = useRef<HTMLInputElement>(null);

   const handleCreateEventFormSubmit: EventFormHandler<TEvent> = (formValues) => {
      setIsCreateEventModalVisible(false);
      setEvents(prevEvents => [
         ...prevEvents,
         {
            ...formValues,
            date: selectedDateRef.current,
            id: crypto.randomUUID(),
         },
      ]);
   };

   const handleEditEventFormSubmit: EventFormHandler<DateEvent> = (formValues) => {
      const newEvents = [...events];
      const indexOfEditedEvent = newEvents.findIndex(event => event.id === formValues.id);
      newEvents[indexOfEditedEvent] = {...newEvents[indexOfEditedEvent], ...formValues};

      setEvents(newEvents);
      handleEditModalClose();
   };

   const handleDayClick: OnChangeFunc = (date: Date) => {
      selectedDateRef.current = date;
      setIsCreateEventModalVisible(true);
   };

   function handleCreateModalClose() {
      setIsCreateEventModalVisible(false);
   }

   function handleEditModalClose() {
      setIsEditEventModalVisible(false);
   }

   const handleEventClick = (event: DateEvent) => {
      setSelectedEvent(event);
      setIsEditEventModalVisible(true);
   };

   const handleDeleteEvent = (event: DateEvent) => setEvents(prevState => prevState.filter(ev => ev.id !== event.id));

   const handleDayDrop: DayDropHandler = ({date, event}) => {
      const newEvents = [...events];
      const indexOfDate = events.findIndex(ev => ev.id === event.id);
      newEvents[indexOfDate] = {...newEvents[indexOfDate], date};
      setEvents(newEvents);
   };

   const handleImportClick = () => {
      importFileInputRef.current!.click();
   };

   const handleSuccessfulImport = ({events, coloredLabels}: ExportValues) => {
      ColoredLabels.setLabelColors = coloredLabels;
      setEvents(events);
      importFileInputRef.current!.value = "";
   };

   const handleEventDrop: EventDropHandler = ({eventOnDropped, currentlyDraggedEvent}) => {
      const newEvents = [...events];

      if (eventOnDropped.date.toDateString() !== currentlyDraggedEvent.date.toDateString()) {
         currentlyDraggedEvent.date = eventOnDropped.date;
      }

      const currentlyDraggedEventIdx = newEvents.findIndex(event => event.id === currentlyDraggedEvent!.id);
      const droppedOnEventIdx = newEvents.findIndex(event => event.id === eventOnDropped.id);
      const idxToInsert = droppedOnEventIdx + (droppedOnEventIdx >= currentlyDraggedEventIdx ? 1 : 0);

      newEvents.splice(currentlyDraggedEventIdx, 1);
      newEvents.splice(idxToInsert, 0, currentlyDraggedEvent);

      setEvents(newEvents);
   };

   const dropdownLabelsOptions: SearchLabelOption[] = [
      {value: "", label: "Search with label"},
      ...Object.entries(ColoredLabels.getLabelColors).map(([id, {label}]) => ({value: id, label}))
   ];

   const filteredEvents = events.filter(event => {
      const filterByLabels = !searchLabel?.value || event.labels.some(label => label === searchLabel?.value);
      return event.name.toLowerCase().includes(searchQuery.toLowerCase()) && filterByLabels;
   });

   return (
       <main>
          <ActionsWrapper>
             <Input placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
             <Dropdown selectedOption={searchLabel} onChange={(option) => setSearchLabel(option!)} options={dropdownLabelsOptions}
                       renderOption={({label}) => <OptionButton>{label}</OptionButton>}/>
             <Button onClick={() => captureScreenshot(document.querySelector(".react-calendar")!, "my_calendar")}>
                Download
             </Button>

             <Button onClick={() => exportEvents(events, ColoredLabels.getLabelColors)}>Export</Button>
             <Button onClick={handleImportClick}>Import</Button>
             <input onChange={e => importEvents(e.target.files![0], handleSuccessfulImport)}
                    ref={importFileInputRef} type="file" style={{display: "none"}} accept=".json"/>
          </ActionsWrapper>
          <Calendar showFixedNumberOfWeeks onClickDay={handleDayClick}
                    tileContent={(props) =>
                        <TileContent onEventDrop={handleEventDrop} onDayDrop={handleDayDrop} onDeleteEventClick={handleDeleteEvent}
                                     onEventClick={handleEventClick} events={filteredEvents} {...props} />}/>

          <EventFormModal isOpen={isCreateEventModalVisible} onClose={handleCreateModalClose} onSubmit={handleCreateEventFormSubmit}>
             <div style={{marginBottom: 10}}>
                Selected date: <time>{selectedDateRef.current.toDateString()}</time>
             </div>
          </EventFormModal>

          <EventFormModal<DateEvent> defaultValues={selectedEvent} isOpen={isEditEventModalVisible} onClose={handleEditModalClose} onSubmit={handleEditEventFormSubmit}>
             <div style={{marginBottom: 10}}>
                Edit Selected date: <time>{selectedEvent?.date.toDateString()}</time>
             </div>
          </EventFormModal>
       </main>
   );
}
