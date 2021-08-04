export interface People {
  name: string;
  sex?: string;
  age?: number;
  job?: string;
}

export interface State {
  people: People[]
}
