import styled from "styled-components";

export const DateEventCard = styled.li`
  background-color: #fff;
  position: relative;
  padding: 7px;
  border-radius: 6px;
  text-align: start;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  &:hover a {
    opacity: 1;
  }
`;
export const DateEventCardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const ColorLabelsContainer = styled.ul`
  display: flex;
  gap: 2px;
  margin-bottom: 4px;
`;
export const ColorLabel = styled.li`
  height: 5px;
  border-radius: 10px;
  width: 35px;
`;
export const DeleteEventButton = styled.a`
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 3px;
  background-color: transparent;
  width: 15px;
  height: 15px;
  color: red;
  border-radius: 7px;
  display: grid;
  place-content: center;
  font-size: 16px;
`
export const DayCellContainer = styled.div`
  display: flex;
  padding: 7px;
  height: 100%;
  justify-content: flex-start;
  gap: 4px;
  flex-direction: column;
  width: 100%;
`
export const EventsAmount = styled.span`
  font-size: 11px;
  font-weight: 400;
`
