export type CreateMock = (url: string, callback: Function) => void

export interface GetPeopleListOptions {
  limit?: number;
  skip?: number;
}
