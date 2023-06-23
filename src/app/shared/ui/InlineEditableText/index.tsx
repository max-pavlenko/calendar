import {ChangeEventHandler, FC, FormEventHandler, MouseEventHandler, useState} from 'react'
import Image from "next/image";
import {Button, Container, EditableInput, Text} from "@/app/shared/ui/InlineEditableText/styles";

type Props = {
   initialText?: string,
   onSubmit: (text: string) => void,
};

const InlineEditableText: FC<Props> = ({initialText, onSubmit}) => {
   const [text, setText] = useState(initialText || '');
   const [isEditing, setIsEditing] = useState(false);

   const toggleEditing: MouseEventHandler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsEditing(prevState => !prevState);
   };

   const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setText(event.target.value);
   };

   const handleSave: FormEventHandler = (e) => {
      e.preventDefault();
      onSubmit(text);
      setIsEditing(false);
   };

   if (isEditing) {
      return (
          <Container>
                <EditableInput autoFocus type="text" value={text} onChange={handleInputChange}/>
                <Button onClick={handleSave}>Save</Button>
          </Container>
      );
   }

   return (
       <Container>
          <Text>{text}</Text>
          <Button type='button' onClick={toggleEditing}>
             <Image fill src='icons/pencil-edit.svg' alt="edit"/>
          </Button>
       </Container>
   );
};

export default InlineEditableText;

