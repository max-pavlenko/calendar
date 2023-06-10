import {ChangeEventHandler, FC, FormEventHandler, MouseEventHandler, useState} from 'react'
import styled from 'styled-components';
import Image from "next/image";

type Props = {
   initialText?: string,
   onSubmit: (text: string) => void,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Text = styled.span`
  display: inline-block;
  font-size: 16px;
  line-height: 1.5;
`;

const EditableInput = styled.input`
  font-size: 16px;
  width: auto;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 7px;
  position: relative;
`

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

