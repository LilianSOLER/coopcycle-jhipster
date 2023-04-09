import { ICooperative } from 'app/entities/cooperative/cooperative.model';
import { MemberRole } from 'app/entities/enumerations/member-role.model';

export interface IMember {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  role?: MemberRole | null;
  cooperativeId?: number | null;
  userId?: number | null;
  cooperativeId?: Pick<ICooperative, 'id'> | null;
}

export type NewMember = Omit<IMember, 'id'> & { id: null };
