import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRestaurant, NewRestaurant } from '../restaurant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRestaurant for edit and NewRestaurantFormGroupInput for create.
 */
type RestaurantFormGroupInput = IRestaurant | PartialWithRequiredKeyOf<NewRestaurant>;

type RestaurantFormDefaults = Pick<NewRestaurant, 'id'>;

type RestaurantFormGroupContent = {
  id: FormControl<IRestaurant['id'] | NewRestaurant['id']>;
  name: FormControl<IRestaurant['name']>;
  description: FormControl<IRestaurant['description']>;
  location: FormControl<IRestaurant['location']>;
  cooperativeId: FormControl<IRestaurant['cooperativeId']>;
  cooperativeId: FormControl<IRestaurant['cooperativeId']>;
};

export type RestaurantFormGroup = FormGroup<RestaurantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RestaurantFormService {
  createRestaurantFormGroup(restaurant: RestaurantFormGroupInput = { id: null }): RestaurantFormGroup {
    const restaurantRawValue = {
      ...this.getFormDefaults(),
      ...restaurant,
    };
    return new FormGroup<RestaurantFormGroupContent>({
      id: new FormControl(
        { value: restaurantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(restaurantRawValue.name, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      description: new FormControl(restaurantRawValue.description, {
        validators: [Validators.maxLength(255)],
      }),
      location: new FormControl(restaurantRawValue.location, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
      }),
      cooperativeId: new FormControl(restaurantRawValue.cooperativeId, {
        validators: [Validators.required],
      }),
      cooperativeId: new FormControl(restaurantRawValue.cooperativeId),
    });
  }

  getRestaurant(form: RestaurantFormGroup): IRestaurant | NewRestaurant {
    return form.getRawValue() as IRestaurant | NewRestaurant;
  }

  resetForm(form: RestaurantFormGroup, restaurant: RestaurantFormGroupInput): void {
    const restaurantRawValue = { ...this.getFormDefaults(), ...restaurant };
    form.reset(
      {
        ...restaurantRawValue,
        id: { value: restaurantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RestaurantFormDefaults {
    return {
      id: null,
    };
  }
}
