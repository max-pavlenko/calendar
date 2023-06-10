
export type TEvent = {
   labels: string[],
   name: string,
}

export type DateEvent = TEvent & {
   date: Date,
   id: string,
}
