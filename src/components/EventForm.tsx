import {ComponentProps, FormEventHandler, PropsWithChildren, useEffect, useState} from "react";
import styled from "styled-components";
import MultiSelectDropdown, {MultiSelectHandler} from "@/components/ui/MultiSelectDropdown";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {DateEvent, TEvent} from "@/types/Event";
import {observer} from "mobx-react-lite";
import ColoredLabels from "@/store/ColoredLabels";
import InlineEditableText from "@/components/ui/InlineEditableText";

export type EventFormHandler<T extends TEvent> = (values: T) => void;

type Props<T extends TEvent> = {
   onSubmit: EventFormHandler<T>;
   defaultValues?: TEvent;
} & Omit<ComponentProps<"form">, "ref" | "onSubmit">;

const ColorSquare = styled.label`
  width: 15px;
  position: relative;
  height: 15px;
  border-radius: 4px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const FormControl = styled.div`
  display: grid;
  gap: 5px;
`;

const Form = styled.form.attrs(props => ({
   ...props
}))`
  display: grid;
  gap: 8px;
`;

const ColorBarsList = styled.ul`
  display: flex;
  gap: 3px;
`;

const ColorBar = styled.li`
  height: 3px;
  border-radius: 7px;
  flex: 1;
`;

const HiddenColorInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const DEFAULT_FORM_VALUES: TEvent = {labels: [], name: ""};

const EventForm = <T extends DateEvent>({ children, defaultValues = DEFAULT_FORM_VALUES, onSubmit, ...props }: PropsWithChildren<Props<T>>) => {
   const [formValues, setFormValues] = useState(defaultValues);

   useEffect(() => {
      setFormValues(defaultValues);
   }, [defaultValues]);

   const handleFormSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      onSubmit(formValues as T);

      setFormValues(DEFAULT_FORM_VALUES);
   };

   const handleLabelSelect: MultiSelectHandler<string> = ({selectedOptions}) => {
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
                 renderOption={(labelID) => <RenderOption isSelected={formValues.labels.includes(labelID)} labelID={labelID}/>}
                 options={coloredLabelsIDs} onSelect={handleLabelSelect} preselectedOptions={formValues.labels}/>

          </FormControl>

          <Button>Save</Button>
       </Form>
   );
};
export default observer(EventForm);

const RenderOption = ({labelID, isSelected}: { labelID: string, isSelected: boolean }) => {
   const {color, label} = ColoredLabels.getLabelColors[labelID];
   const [newLabel, setNewLabel] = useState(label);

   if (!color) return null;

   return (
       <>
          <InlineEditableText initialText={label} onSubmit={(newLabel) => setNewLabel(newLabel)}/>
          <ColorSquare onClick={e => e.stopPropagation()} style={{backgroundColor: color}}>
             <HiddenColorInput value={color}
                               disabled={!isSelected}
                               onChange={e => ColoredLabels.editColoredLabel(labelID, {color: e.target.value, label: newLabel})}
                               type="color"/>
          </ColorSquare>
       </>
   );
};
