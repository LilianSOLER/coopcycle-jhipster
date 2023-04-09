import { IRestaurant } from 'app/entities/restaurant/restaurant.model';

export interface IMenu {
  id: number;
  name?: string | null;
  description?: string | null;
  restaurantId?: number | null;
  restaurantId?: Pick<IRestaurant, 'id'> | null;
}

export type NewMenu = Omit<IMenu, 'id'> & { id: null };
