import dayjs from 'dayjs/esm';

import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 76194,
  cartId: 30398,
  courierId: 72103,
  restaurantId: 14206,
  deliveryTime: dayjs('2023-04-08T12:34'),
  pickupTime: dayjs('2023-04-08T15:14'),
};

export const sampleWithPartialData: IDelivery = {
  id: 49541,
  cartId: 94739,
  courierId: 56350,
  restaurantId: 57806,
  deliveryTime: dayjs('2023-04-08T09:29'),
  pickupTime: dayjs('2023-04-09T07:23'),
};

export const sampleWithFullData: IDelivery = {
  id: 18248,
  cartId: 39066,
  courierId: 66312,
  restaurantId: 48174,
  deliveryTime: dayjs('2023-04-08T10:16'),
  pickupTime: dayjs('2023-04-08T10:08'),
};

export const sampleWithNewData: NewDelivery = {
  cartId: 79789,
  courierId: 35202,
  restaurantId: 88358,
  deliveryTime: dayjs('2023-04-08T18:38'),
  pickupTime: dayjs('2023-04-08T08:08'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
