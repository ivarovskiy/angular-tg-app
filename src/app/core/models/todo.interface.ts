export interface ITag {
  name: string;
  color: string;
}

export interface ITodo {
  id: number;
  time: string;
  duration?: string[];
  status: boolean;
  title: string;
  description?: string;
  tags?: ITag[];
}
