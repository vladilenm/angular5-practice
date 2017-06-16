export class Event {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description?: string,
    public categoryName?: string,
    public id?: number
  ) {}
}
