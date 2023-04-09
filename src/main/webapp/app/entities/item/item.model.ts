import { IMenu } from 'app/entities/menu/menu.model';

export interface IItem {
  id: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  menuId?: number | null;
  menuId?: Pick<IMenu, 'id'> | null;
}

export type NewItem = Omit<IItem, 'id'> & { id: null };
