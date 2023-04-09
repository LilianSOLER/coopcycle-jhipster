import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CartFormService } from './cart-form.service';
import { CartService } from '../service/cart.service';
import { ICart } from '../cart.model';
import { IUserCoopcycle } from 'app/entities/user-coopcycle/user-coopcycle.model';
import { UserCoopcycleService } from 'app/entities/user-coopcycle/service/user-coopcycle.service';

import { CartUpdateComponent } from './cart-update.component';

describe('Cart Management Update Component', () => {
  let comp: CartUpdateComponent;
  let fixture: ComponentFixture<CartUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cartFormService: CartFormService;
  let cartService: CartService;
  let userCoopcycleService: UserCoopcycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CartUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CartUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CartUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cartFormService = TestBed.inject(CartFormService);
    cartService = TestBed.inject(CartService);
    userCoopcycleService = TestBed.inject(UserCoopcycleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UserCoopcycle query and add missing value', () => {
      const cart: ICart = { id: 456 };
      const userId: IUserCoopcycle = { id: 39410 };
      cart.userId = userId;

      const userCoopcycleCollection: IUserCoopcycle[] = [{ id: 85034 }];
      jest.spyOn(userCoopcycleService, 'query').mockReturnValue(of(new HttpResponse({ body: userCoopcycleCollection })));
      const additionalUserCoopcycles = [userId];
      const expectedCollection: IUserCoopcycle[] = [...additionalUserCoopcycles, ...userCoopcycleCollection];
      jest.spyOn(userCoopcycleService, 'addUserCoopcycleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cart });
      comp.ngOnInit();

      expect(userCoopcycleService.query).toHaveBeenCalled();
      expect(userCoopcycleService.addUserCoopcycleToCollectionIfMissing).toHaveBeenCalledWith(
        userCoopcycleCollection,
        ...additionalUserCoopcycles.map(expect.objectContaining)
      );
      expect(comp.userCoopcyclesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cart: ICart = { id: 456 };
      const userId: IUserCoopcycle = { id: 31463 };
      cart.userId = userId;

      activatedRoute.data = of({ cart });
      comp.ngOnInit();

      expect(comp.userCoopcyclesSharedCollection).toContain(userId);
      expect(comp.cart).toEqual(cart);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICart>>();
      const cart = { id: 123 };
      jest.spyOn(cartFormService, 'getCart').mockReturnValue(cart);
      jest.spyOn(cartService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cart });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cart }));
      saveSubject.complete();

      // THEN
      expect(cartFormService.getCart).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cartService.update).toHaveBeenCalledWith(expect.objectContaining(cart));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICart>>();
      const cart = { id: 123 };
      jest.spyOn(cartFormService, 'getCart').mockReturnValue({ id: null });
      jest.spyOn(cartService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cart: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cart }));
      saveSubject.complete();

      // THEN
      expect(cartFormService.getCart).toHaveBeenCalled();
      expect(cartService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICart>>();
      const cart = { id: 123 };
      jest.spyOn(cartService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cart });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cartService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUserCoopcycle', () => {
      it('Should forward to userCoopcycleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userCoopcycleService, 'compareUserCoopcycle');
        comp.compareUserCoopcycle(entity, entity2);
        expect(userCoopcycleService.compareUserCoopcycle).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
