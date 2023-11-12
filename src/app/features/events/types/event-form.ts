import {BaseEvent} from '@/app/features/events/types/event';
import {ComponentProps} from 'react';

export type EventFormSubmitHandler<T extends BaseEvent> = (values: T) => void;

export type Props<T extends BaseEvent> = {
   onSubmit: EventFormSubmitHandler<T>;
   defaultValues?: BaseEvent;
} & Omit<ComponentProps<'form'>, 'ref' | 'onSubmit'>;
