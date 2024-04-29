export interface ITodo {
  id: number;
  time: string;
  duration?: string[];
  status: boolean;
  title: string;
  description?: string;
  badges?: string[];
}
