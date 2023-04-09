import { IItem, NewItem } from './item.model';

export const sampleWithRequiredData: IItem = {
  id: 89800,
  name: 'Bedfordshire input',
  price: 45749,
  menuId: 49177,
};

export const sampleWithPartialData: IItem = {
  id: 59396,
  name: 'Agent Jewelery grow',
  description: 'Profit-focused',
  price: 88804,
  menuId: 26180,
};

export const sampleWithFullData: IItem = {
  id: 24056,
  name: 'next-generation',
  description: 'Operations',
  price: 14885,
  menuId: 39656,
};

export const sampleWithNewData: NewItem = {
  name: 'Island exploit',
  price: 68348,
  menuId: 57081,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
