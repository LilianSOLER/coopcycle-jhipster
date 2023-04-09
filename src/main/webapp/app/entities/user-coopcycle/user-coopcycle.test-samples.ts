import { IUserCoopcycle, NewUserCoopcycle } from './user-coopcycle.model';

export const sampleWithRequiredData: IUserCoopcycle = {
  id: 16928,
  login: 'calculating Assurance',
  password: 'ValleyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  email: 'Lowell.Feest91@hotmail.com',
  location: 'XML bifurcated',
  authorities: 'Frozen',
};

export const sampleWithPartialData: IUserCoopcycle = {
  id: 32953,
  login: 'Montana firewall',
  password: 'depositXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  firstName: 'Oswald',
  lastName: 'Boyer',
  email: 'Colt_Watsica67@yahoo.com',
  location: 'networks',
  authorities: 'Mississippi Hong Lari',
};

export const sampleWithFullData: IUserCoopcycle = {
  id: 91169,
  login: 'Plastic drive Team-oriented',
  password: 'Central value-added value-addedXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  firstName: 'Elody',
  lastName: 'Lubowitz',
  email: 'Maida18@yahoo.com',
  location: 'Fiji Cotton online',
  activated: true,
  authorities: 'Investment',
};

export const sampleWithNewData: NewUserCoopcycle = {
  login: 'system Michigan withdrawal',
  password: 'Data coherent AdministratorXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  email: 'Tad55@hotmail.com',
  location: 'Louisiana',
  authorities: 'drive Health',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
