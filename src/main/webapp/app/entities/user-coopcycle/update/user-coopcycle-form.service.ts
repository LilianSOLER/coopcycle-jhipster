import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserCoopcycle, NewUserCoopcycle } from '../user-coopcycle.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserCoopcycle for edit and NewUserCoopcycleFormGroupInput for create.
 */
type UserCoopcycleFormGroupInput = IUserCoopcycle | PartialWithRequiredKeyOf<NewUserCoopcycle>;

type UserCoopcycleFormDefaults = Pick<NewUserCoopcycle, 'id' | 'activated'>;

type UserCoopcycleFormGroupContent = {
  id: FormControl<IUserCoopcycle['id'] | NewUserCoopcycle['id']>;
  login: FormControl<IUserCoopcycle['login']>;
  password: FormControl<IUserCoopcycle['password']>;
  firstName: FormControl<IUserCoopcycle['firstName']>;
  lastName: FormControl<IUserCoopcycle['lastName']>;
  email: FormControl<IUserCoopcycle['email']>;
  location: FormControl<IUserCoopcycle['location']>;
  activated: FormControl<IUserCoopcycle['activated']>;
  authorities: FormControl<IUserCoopcycle['authorities']>;
  member: FormControl<IUserCoopcycle['member']>;
};

export type UserCoopcycleFormGroup = FormGroup<UserCoopcycleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserCoopcycleFormService {
  createUserCoopcycleFormGroup(userCoopcycle: UserCoopcycleFormGroupInput = { id: null }): UserCoopcycleFormGroup {
    const userCoopcycleRawValue = {
      ...this.getFormDefaults(),
      ...userCoopcycle,
    };
    return new FormGroup<UserCoopcycleFormGroupContent>({
      id: new FormControl(
        { value: userCoopcycleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      login: new FormControl(userCoopcycleRawValue.login, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
      }),
      password: new FormControl(userCoopcycleRawValue.password, {
        validators: [Validators.required, Validators.minLength(60), Validators.maxLength(60)],
      }),
      firstName: new FormControl(userCoopcycleRawValue.firstName, {
        validators: [Validators.maxLength(50)],
      }),
      lastName: new FormControl(userCoopcycleRawValue.lastName, {
        validators: [Validators.maxLength(50)],
      }),
      email: new FormControl(userCoopcycleRawValue.email, {
        validators: [Validators.required, Validators.maxLength(254)],
      }),
      location: new FormControl(userCoopcycleRawValue.location, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
      }),
      activated: new FormControl(userCoopcycleRawValue.activated),
      authorities: new FormControl(userCoopcycleRawValue.authorities, {
        validators: [Validators.required],
      }),
      member: new FormControl(userCoopcycleRawValue.member),
    });
  }

  getUserCoopcycle(form: UserCoopcycleFormGroup): IUserCoopcycle | NewUserCoopcycle {
    return form.getRawValue() as IUserCoopcycle | NewUserCoopcycle;
  }

  resetForm(form: UserCoopcycleFormGroup, userCoopcycle: UserCoopcycleFormGroupInput): void {
    const userCoopcycleRawValue = { ...this.getFormDefaults(), ...userCoopcycle };
    form.reset(
      {
        ...userCoopcycleRawValue,
        id: { value: userCoopcycleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserCoopcycleFormDefaults {
    return {
      id: null,
      activated: false,
    };
  }
}
