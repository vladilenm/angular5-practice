export class Event {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public id?: number
  ) {}
}
