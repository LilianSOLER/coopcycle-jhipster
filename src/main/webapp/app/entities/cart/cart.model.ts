import { IUserCoopcycle } from 'app/entities/user-coopcycle/user-coopcycle.model';

export interface ICart {
  id: number;
  userId?: number | null;
  userId?: Pick<IUserCoopcycle, 'id'> | null;
}

export type NewCart = Omit<ICart, 'id'> & { id: null };
