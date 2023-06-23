import {ComponentProps, FormEventHandler, PropsWithChildren, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import ColoredLabels from "@/store/ColoredLabels";
import MultiSelectDropdown, {MultiSelectOptionHandler} from "@/app/shared/ui/MultiSelectDropdown";
import Input from "@/app/shared/ui/Input";
import Button from "@/app/shared/ui/Button";
import InlineEditableText from "@/app/shared/ui/InlineEditableText";
import {ColorBar, ColorBarsList, ColorSquare, Form, FormControl, HiddenColorInput} from "@/app/features/calendar/components/EventForm/styles";
import {BaseDateEvent, DateEvent} from "@/types/Events";

export type EventFormSubmitHandler<T extends BaseDateEvent> = (values: T) => void;

type Props<T extends BaseDateEvent> = {
   onSubmit: EventFormSubmitHandler<T>;
   defaultValues?: BaseDateEvent;
} & Omit<ComponentProps<"form">, "ref" | "onSubmit">;

const DEFAULT_FORM_VALUES: BaseDateEvent = {labels: [], name: ""};

const EventForm = <T extends DateEvent>({children, defaultValues = DEFAULT_FORM_VALUES, onSubmit, ...props}: PropsWithChildren<Props<T>>) => {
   const [formValues, setFormValues] = useState(defaultValues);

   useEffect(() => {
      setFormValues(defaultValues);
   }, [defaultValues]);

   const handleFormSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      onSubmit(formValues as T);

      setFormValues(DEFAULT_FORM_VALUES);
   };

   const handleLabelSelect: MultiSelectOptionHandler<string> = ({selectedOptions}) => {
      setFormValues(prevState => ({...prevState, labels: selectedOptions}));
   };

   const coloredLabelsIDs = Object.keys(ColoredLabels.getLabelColors);

   return (
       <Form {...props} onSubmit={handleFormSubmit}>
          <div>
             {children}
             <ColorBarsList>
                {formValues.labels.map(label => (
                    <ColorBar key={label} style={{backgroundColor: ColoredLabels.getLabelColors[label].color}}/>
                ))}
             </ColorBarsList>
          </div>
          <FormControl>
             <label>Event Name:</label>
             <Input required value={formValues.name} onChange={e => setFormValues({...formValues, name: e.target.value})}/>
          </FormControl>

          <FormControl>
             <label>Multiple Labels:</label>
             <MultiSelectDropdown<string>
                 onDeleteOption={(option) => ColoredLabels.removeColoredLabel(option)}
                 onAddOption={() => ColoredLabels.addColoredLabel({color: "#000", label: "Change me!"})}
                 renderOption={(labelID) => <RenderSelectLabelOption isSelected={formValues.labels.includes(labelID)} labelID={labelID}/>}
                 options={coloredLabelsIDs} onSelect={handleLabelSelect} preselectedOptions={formValues.labels}/>
          </FormControl>

          <Button>Save</Button>
       </Form>
   );
};
export default observer(EventForm);

const RenderSelectLabelOption = ({labelID, isSelected}: { labelID: string, isSelected: boolean }) => {
   const {color, label} = ColoredLabels.getLabelColors[labelID];
   const [newLabel, setNewLabel] = useState(label);

   if (!color) return null;

   return (
       <>
          <InlineEditableText initialText={label} onSubmit={(newLabel) => setNewLabel(newLabel)}/>
          <ColorSquare onClick={e => e.stopPropagation()} style={{backgroundColor: color}}>
             <HiddenColorInput value={color} disabled={!isSelected}
                               onChange={e => ColoredLabels.editColoredLabel(labelID, {color: e.target.value, label: newLabel})}
             />
          </ColorSquare>
       </>
   );
};
