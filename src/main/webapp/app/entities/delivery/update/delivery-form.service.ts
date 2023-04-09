import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDelivery, NewDelivery } from '../delivery.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDelivery for edit and NewDeliveryFormGroupInput for create.
 */
type DeliveryFormGroupInput = IDelivery | PartialWithRequiredKeyOf<NewDelivery>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDelivery | NewDelivery> = Omit<T, 'deliveryTime' | 'pickupTime'> & {
  deliveryTime?: string | null;
  pickupTime?: string | null;
};

type DeliveryFormRawValue = FormValueOf<IDelivery>;

type NewDeliveryFormRawValue = FormValueOf<NewDelivery>;

type DeliveryFormDefaults = Pick<NewDelivery, 'id' | 'deliveryTime' | 'pickupTime'>;

type DeliveryFormGroupContent = {
  id: FormControl<DeliveryFormRawValue['id'] | NewDelivery['id']>;
  cartId: FormControl<DeliveryFormRawValue['cartId']>;
  courierId: FormControl<DeliveryFormRawValue['courierId']>;
  restaurantId: FormControl<DeliveryFormRawValue['restaurantId']>;
  deliveryTime: FormControl<DeliveryFormRawValue['deliveryTime']>;
  pickupTime: FormControl<DeliveryFormRawValue['pickupTime']>;
  courierId: FormControl<DeliveryFormRawValue['courierId']>;
  restaurantId: FormControl<DeliveryFormRawValue['restaurantId']>;
  cartId: FormControl<DeliveryFormRawValue['cartId']>;
};

export type DeliveryFormGroup = FormGroup<DeliveryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryFormService {
  createDeliveryFormGroup(delivery: DeliveryFormGroupInput = { id: null }): DeliveryFormGroup {
    const deliveryRawValue = this.convertDeliveryToDeliveryRawValue({
      ...this.getFormDefaults(),
      ...delivery,
    });
    return new FormGroup<DeliveryFormGroupContent>({
      id: new FormControl(
        { value: deliveryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cartId: new FormControl(deliveryRawValue.cartId, {
        validators: [Validators.required],
      }),
      courierId: new FormControl(deliveryRawValue.courierId, {
        validators: [Validators.required],
      }),
      restaurantId: new FormControl(deliveryRawValue.restaurantId, {
        validators: [Validators.required],
      }),
      deliveryTime: new FormControl(deliveryRawValue.deliveryTime, {
        validators: [Validators.required],
      }),
      pickupTime: new FormControl(deliveryRawValue.pickupTime, {
        validators: [Validators.required],
      }),
      courierId: new FormControl(deliveryRawValue.courierId),
      restaurantId: new FormControl(deliveryRawValue.restaurantId),
      cartId: new FormControl(deliveryRawValue.cartId),
    });
  }

  getDelivery(form: DeliveryFormGroup): IDelivery | NewDelivery {
    return this.convertDeliveryRawValueToDelivery(form.getRawValue() as DeliveryFormRawValue | NewDeliveryFormRawValue);
  }

  resetForm(form: DeliveryFormGroup, delivery: DeliveryFormGroupInput): void {
    const deliveryRawValue = this.convertDeliveryToDeliveryRawValue({ ...this.getFormDefaults(), ...delivery });
    form.reset(
      {
        ...deliveryRawValue,
        id: { value: deliveryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      deliveryTime: currentTime,
      pickupTime: currentTime,
    };
  }

  private convertDeliveryRawValueToDelivery(rawDelivery: DeliveryFormRawValue | NewDeliveryFormRawValue): IDelivery | NewDelivery {
    return {
      ...rawDelivery,
      deliveryTime: dayjs(rawDelivery.deliveryTime, DATE_TIME_FORMAT),
      pickupTime: dayjs(rawDelivery.pickupTime, DATE_TIME_FORMAT),
    };
  }

  private convertDeliveryToDeliveryRawValue(
    delivery: IDelivery | (Partial<NewDelivery> & DeliveryFormDefaults)
  ): DeliveryFormRawValue | PartialWithRequiredKeyOf<NewDeliveryFormRawValue> {
    return {
      ...delivery,
      deliveryTime: delivery.deliveryTime ? delivery.deliveryTime.format(DATE_TIME_FORMAT) : undefined,
      pickupTime: delivery.pickupTime ? delivery.pickupTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
