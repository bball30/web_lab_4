export class Point {
  constructor(
    public id: number,
    public x: number,
    public y: number,
    public r: number,
    public hit: boolean,
    public time: string,
    public owner: string,
    public user: {username: string}
  ) {
  }
}
