import {PropsWithChildren, ReactNode} from 'react';

export type MultiSelectOptionHandler<T> = ({selectedOptions, option}: { option: T, selectedOptions: T[] }) => void;

export type Props<T> = PropsWithChildren<{
   options: T[],
   onSelect: MultiSelectOptionHandler<T>,
   renderOption: (option: T) => ReactNode,
   preselectedOptions?: T[],
   onDeleteOption?: (option: T) => void,
   comparator?: (config: { selectedOptions: T[], option: T }) => boolean
}>;
