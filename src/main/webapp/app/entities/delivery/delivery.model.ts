import dayjs from 'dayjs/esm';
import { IMember } from 'app/entities/member/member.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ICart } from 'app/entities/cart/cart.model';

export interface IDelivery {
  id: number;
  cartId?: number | null;
  courierId?: number | null;
  restaurantId?: number | null;
  deliveryTime?: dayjs.Dayjs | null;
  pickupTime?: dayjs.Dayjs | null;
  courierId?: Pick<IMember, 'id'> | null;
  restaurantId?: Pick<IRestaurant, 'id'> | null;
  cartId?: Pick<ICart, 'id'> | null;
}

export type NewDelivery = Omit<IDelivery, 'id'> & { id: null };
