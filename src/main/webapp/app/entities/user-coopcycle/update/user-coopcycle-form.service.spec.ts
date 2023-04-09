import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-coopcycle.test-samples';

import { UserCoopcycleFormService } from './user-coopcycle-form.service';

describe('UserCoopcycle Form Service', () => {
  let service: UserCoopcycleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCoopcycleFormService);
  });

  describe('Service methods', () => {
    describe('createUserCoopcycleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserCoopcycleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            login: expect.any(Object),
            password: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            location: expect.any(Object),
            activated: expect.any(Object),
            authorities: expect.any(Object),
            member: expect.any(Object),
          })
        );
      });

      it('passing IUserCoopcycle should create a new form with FormGroup', () => {
        const formGroup = service.createUserCoopcycleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            login: expect.any(Object),
            password: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            email: expect.any(Object),
            location: expect.any(Object),
            activated: expect.any(Object),
            authorities: expect.any(Object),
            member: expect.any(Object),
          })
        );
      });
    });

    describe('getUserCoopcycle', () => {
      it('should return NewUserCoopcycle for default UserCoopcycle initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserCoopcycleFormGroup(sampleWithNewData);

        const userCoopcycle = service.getUserCoopcycle(formGroup) as any;

        expect(userCoopcycle).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserCoopcycle for empty UserCoopcycle initial value', () => {
        const formGroup = service.createUserCoopcycleFormGroup();

        const userCoopcycle = service.getUserCoopcycle(formGroup) as any;

        expect(userCoopcycle).toMatchObject({});
      });

      it('should return IUserCoopcycle', () => {
        const formGroup = service.createUserCoopcycleFormGroup(sampleWithRequiredData);

        const userCoopcycle = service.getUserCoopcycle(formGroup) as any;

        expect(userCoopcycle).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserCoopcycle should not enable id FormControl', () => {
        const formGroup = service.createUserCoopcycleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserCoopcycle should disable id FormControl', () => {
        const formGroup = service.createUserCoopcycleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
