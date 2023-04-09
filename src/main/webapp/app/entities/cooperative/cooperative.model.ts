export interface ICooperative {
  id: number;
  name?: string | null;
  description?: string | null;
}

export type NewCooperative = Omit<ICooperative, 'id'> & { id: null };
