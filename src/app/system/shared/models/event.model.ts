export class Event {
  constructor(
    private type: string,
    private amount: number,
    private category: number,
    private date: string,
    private id?: number
  ) {}
}
