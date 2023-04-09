import { ICooperative } from 'app/entities/cooperative/cooperative.model';

export interface IRestaurant {
  id: number;
  name?: string | null;
  description?: string | null;
  location?: string | null;
  cooperativeId?: number | null;
  cooperativeId?: Pick<ICooperative, 'id'> | null;
}

export type NewRestaurant = Omit<IRestaurant, 'id'> & { id: null };
