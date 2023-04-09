import dayjs from 'dayjs/esm';

import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 76194,
  cartId: 30398,
  courierId: 72103,
  restaurantId: 14206,
  deliveryTime: dayjs('2023-04-08T12:37'),
  pickupTime: dayjs('2023-04-08T15:17'),
};

export const sampleWithPartialData: IDelivery = {
  id: 49541,
  cartId: 94739,
  courierId: 56350,
  restaurantId: 57806,
  deliveryTime: dayjs('2023-04-08T09:31'),
  pickupTime: dayjs('2023-04-09T07:26'),
};

export const sampleWithFullData: IDelivery = {
  id: 18248,
  cartId: 39066,
  courierId: 66312,
  restaurantId: 48174,
  deliveryTime: dayjs('2023-04-08T10:18'),
  pickupTime: dayjs('2023-04-08T10:11'),
};

export const sampleWithNewData: NewDelivery = {
  cartId: 79789,
  courierId: 35202,
  restaurantId: 88358,
  deliveryTime: dayjs('2023-04-08T18:40'),
  pickupTime: dayjs('2023-04-08T08:11'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
