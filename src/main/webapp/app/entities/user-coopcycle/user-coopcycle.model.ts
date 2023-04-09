import { IMember } from 'app/entities/member/member.model';

export interface IUserCoopcycle {
  id: number;
  login?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  location?: string | null;
  activated?: boolean | null;
  authorities?: string | null;
  member?: Pick<IMember, 'id'> | null;
}

export type NewUserCoopcycle = Omit<IUserCoopcycle, 'id'> & { id: null };
