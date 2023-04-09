import { ICart, NewCart } from './cart.model';

export const sampleWithRequiredData: ICart = {
  id: 50053,
  userId: 85678,
};

export const sampleWithPartialData: ICart = {
  id: 91768,
  userId: 79348,
};

export const sampleWithFullData: ICart = {
  id: 97396,
  userId: 2200,
};

export const sampleWithNewData: NewCart = {
  userId: 12705,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
