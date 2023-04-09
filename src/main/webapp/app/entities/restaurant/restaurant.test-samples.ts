import { IRestaurant, NewRestaurant } from './restaurant.model';

export const sampleWithRequiredData: IRestaurant = {
  id: 59197,
  name: 'zero Human',
  location: 'Future-proofed Rustic Director',
  cooperativeId: 64585,
};

export const sampleWithPartialData: IRestaurant = {
  id: 5345,
  name: 'base',
  description: 'tan',
  location: 'Technician Squares',
  cooperativeId: 58782,
};

export const sampleWithFullData: IRestaurant = {
  id: 62575,
  name: 'Steel Jersey Granite',
  description: 'bypass',
  location: 'compressing',
  cooperativeId: 70673,
};

export const sampleWithNewData: NewRestaurant = {
  name: 'archive Jewelery',
  location: 'Intelligent infrastructures',
  cooperativeId: 4212,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
