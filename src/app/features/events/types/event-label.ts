export type EventLabel = {label: string, color: string};

export type EventLabelsMap = Record<string, EventLabel>;

export type EventLabelSearchOption = Pick<EventLabel, 'label'> & {
   value: string;
};
