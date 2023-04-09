import { IMenu, NewMenu } from './menu.model';

export const sampleWithRequiredData: IMenu = {
  id: 56082,
  name: 'Andorra copying',
  restaurantId: 29833,
};

export const sampleWithPartialData: IMenu = {
  id: 72491,
  name: 'Ergonomic Cambridgeshire',
  restaurantId: 53639,
};

export const sampleWithFullData: IMenu = {
  id: 55350,
  name: 'connecting calculate',
  description: 'Frozen',
  restaurantId: 92564,
};

export const sampleWithNewData: NewMenu = {
  name: 'panel',
  restaurantId: 99369,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
