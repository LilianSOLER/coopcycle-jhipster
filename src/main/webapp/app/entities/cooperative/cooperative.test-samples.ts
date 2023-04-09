import { ICooperative, NewCooperative } from './cooperative.model';

export const sampleWithRequiredData: ICooperative = {
  id: 84816,
  name: 'incentivize program Radial',
};

export const sampleWithPartialData: ICooperative = {
  id: 80126,
  name: 'Developer',
  description: 'Fish',
};

export const sampleWithFullData: ICooperative = {
  id: 60826,
  name: 'Granite Pizza',
  description: 'Convertible deposit',
};

export const sampleWithNewData: NewCooperative = {
  name: 'Senegal Buckinghamshire Implemented',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
