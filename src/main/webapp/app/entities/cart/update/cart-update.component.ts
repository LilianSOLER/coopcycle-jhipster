import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CartFormService, CartFormGroup } from './cart-form.service';
import { ICart } from '../cart.model';
import { CartService } from '../service/cart.service';
import { IUserCoopcycle } from 'app/entities/user-coopcycle/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/service/user-coopcycle.service';

@Component({
  selector: 'jhi-cart-update',
  templateUrl: './cart-update.component.html',
})
export class CartUpdateComponent implements OnInit {
  isSaving = false;
  cart: ICart | null = null;

  userCoopcyclesSharedCollection: IUserCoopcycle[] = [];

  editForm: CartFormGroup = this.cartFormService.createCartFormGroup();

  constructor(
    protected cartService: CartService,
    protected cartFormService: CartFormService,
    protected userCoopcycleService: UserCoopcycleService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUserCoopcycle = (o1: IUserCoopcycle | null, o2: IUserCoopcycle | null): boolean =>
    this.userCoopcycleService.compareUserCoopcycle(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cart }) => {
      this.cart = cart;
      if (cart) {
        this.updateForm(cart);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cart = this.cartFormService.getCart(this.editForm);
    if (cart.id !== null) {
      this.subscribeToSaveResponse(this.cartService.update(cart));
    } else {
      this.subscribeToSaveResponse(this.cartService.create(cart));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICart>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cart: ICart): void {
    this.cart = cart;
    this.cartFormService.resetForm(this.editForm, cart);

    this.userCoopcyclesSharedCollection = this.userCoopcycleService.addUserCoopcycleToCollectionIfMissing<IUserCoopcycle>(
      this.userCoopcyclesSharedCollection,
      cart.userId
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userCoopcycleService
      .query()
      .pipe(map((res: HttpResponse<IUserCoopcycle[]>) => res.body ?? []))
      .pipe(
        map((userCoopcycles: IUserCoopcycle[]) =>
          this.userCoopcycleService.addUserCoopcycleToCollectionIfMissing<IUserCoopcycle>(userCoopcycles, this.cart?.userId)
        )
      )
      .subscribe((userCoopcycles: IUserCoopcycle[]) => (this.userCoopcyclesSharedCollection = userCoopcycles));
  }
}
