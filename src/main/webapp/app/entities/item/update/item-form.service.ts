import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItem, NewItem } from '../item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItem for edit and NewItemFormGroupInput for create.
 */
type ItemFormGroupInput = IItem | PartialWithRequiredKeyOf<NewItem>;

type ItemFormDefaults = Pick<NewItem, 'id'>;

type ItemFormGroupContent = {
  id: FormControl<IItem['id'] | NewItem['id']>;
  name: FormControl<IItem['name']>;
  description: FormControl<IItem['description']>;
  price: FormControl<IItem['price']>;
  menuId: FormControl<IItem['menuId']>;
  menuId: FormControl<IItem['menuId']>;
};

export type ItemFormGroup = FormGroup<ItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemFormService {
  createItemFormGroup(item: ItemFormGroupInput = { id: null }): ItemFormGroup {
    const itemRawValue = {
      ...this.getFormDefaults(),
      ...item,
    };
    return new FormGroup<ItemFormGroupContent>({
      id: new FormControl(
        { value: itemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(itemRawValue.name, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      description: new FormControl(itemRawValue.description, {
        validators: [Validators.maxLength(255)],
      }),
      price: new FormControl(itemRawValue.price, {
        validators: [Validators.required],
      }),
      menuId: new FormControl(itemRawValue.menuId, {
        validators: [Validators.required],
      }),
      menuId: new FormControl(itemRawValue.menuId),
    });
  }

  getItem(form: ItemFormGroup): IItem | NewItem {
    return form.getRawValue() as IItem | NewItem;
  }

  resetForm(form: ItemFormGroup, item: ItemFormGroupInput): void {
    const itemRawValue = { ...this.getFormDefaults(), ...item };
    form.reset(
      {
        ...itemRawValue,
        id: { value: itemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ItemFormDefaults {
    return {
      id: null,
    };
  }
}
