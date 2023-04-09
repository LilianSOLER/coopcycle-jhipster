import { MemberRole } from 'app/entities/enumerations/member-role.model';

import { IMember, NewMember } from './member.model';

export const sampleWithRequiredData: IMember = {
  id: 27280,
  firstName: 'Doug',
  lastName: 'Spencer',
  email: 'Kaylie25@gmail.com',
  role: MemberRole['RESTAURANT_OWNER'],
  cooperativeId: 40128,
};

export const sampleWithPartialData: IMember = {
  id: 68948,
  firstName: 'Bennett',
  lastName: 'Rice',
  email: 'Mozell57@gmail.com',
  role: MemberRole['COURIER'],
  cooperativeId: 63331,
};

export const sampleWithFullData: IMember = {
  id: 55165,
  firstName: 'Guido',
  lastName: 'Sawayn',
  email: 'Tony_Nicolas@hotmail.com',
  role: MemberRole['RESTAURANT_OWNER'],
  cooperativeId: 78684,
  userId: 64165,
};

export const sampleWithNewData: NewMember = {
  firstName: 'Jerrell',
  lastName: 'Botsford',
  email: 'Roselyn_Lynch29@yahoo.com',
  role: MemberRole['CUSTOMER'],
  cooperativeId: 55902,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
