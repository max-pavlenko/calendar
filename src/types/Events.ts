
export type BaseDateEvent = {
   labels: string[],
   name: string,
}

export type DateEvent = BaseDateEvent & {
   date: Date,
   id: string,
}
