import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserCoopcycle } from '../user-coopcycle.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-coopcycle.test-samples';

import { UserCoopcycleService } from './user-coopcycle.service';

const requireRestSample: IUserCoopcycle = {
  ...sampleWithRequiredData,
};

describe('UserCoopcycle Service', () => {
  let service: UserCoopcycleService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserCoopcycle | IUserCoopcycle[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserCoopcycleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a UserCoopcycle', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userCoopcycle = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userCoopcycle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserCoopcycle', () => {
      const userCoopcycle = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userCoopcycle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserCoopcycle', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserCoopcycle', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserCoopcycle', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserCoopcycleToCollectionIfMissing', () => {
      it('should add a UserCoopcycle to an empty array', () => {
        const userCoopcycle: IUserCoopcycle = sampleWithRequiredData;
        expectedResult = service.addUserCoopcycleToCollectionIfMissing([], userCoopcycle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userCoopcycle);
      });

      it('should not add a UserCoopcycle to an array that contains it', () => {
        const userCoopcycle: IUserCoopcycle = sampleWithRequiredData;
        const userCoopcycleCollection: IUserCoopcycle[] = [
          {
            ...userCoopcycle,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserCoopcycleToCollectionIfMissing(userCoopcycleCollection, userCoopcycle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserCoopcycle to an array that doesn't contain it", () => {
        const userCoopcycle: IUserCoopcycle = sampleWithRequiredData;
        const userCoopcycleCollection: IUserCoopcycle[] = [sampleWithPartialData];
        expectedResult = service.addUserCoopcycleToCollectionIfMissing(userCoopcycleCollection, userCoopcycle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userCoopcycle);
      });

      it('should add only unique UserCoopcycle to an array', () => {
        const userCoopcycleArray: IUserCoopcycle[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userCoopcycleCollection: IUserCoopcycle[] = [sampleWithRequiredData];
        expectedResult = service.addUserCoopcycleToCollectionIfMissing(userCoopcycleCollection, ...userCoopcycleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userCoopcycle: IUserCoopcycle = sampleWithRequiredData;
        const userCoopcycle2: IUserCoopcycle = sampleWithPartialData;
        expectedResult = service.addUserCoopcycleToCollectionIfMissing([], userCoopcycle, userCoopcycle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userCoopcycle);
        expect(expectedResult).toContain(userCoopcycle2);
      });

      it('should accept null and undefined values', () => {
        const userCoopcycle: IUserCoopcycle = sampleWithRequiredData;
        expectedResult = service.addUserCoopcycleToCollectionIfMissing([], null, userCoopcycle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userCoopcycle);
      });

      it('should return initial array if no UserCoopcycle is added', () => {
        const userCoopcycleCollection: IUserCoopcycle[] = [sampleWithRequiredData];
        expectedResult = service.addUserCoopcycleToCollectionIfMissing(userCoopcycleCollection, undefined, null);
        expect(expectedResult).toEqual(userCoopcycleCollection);
      });
    });

    describe('compareUserCoopcycle', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserCoopcycle(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserCoopcycle(entity1, entity2);
        const compareResult2 = service.compareUserCoopcycle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserCoopcycle(entity1, entity2);
        const compareResult2 = service.compareUserCoopcycle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserCoopcycle(entity1, entity2);
        const compareResult2 = service.compareUserCoopcycle(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
