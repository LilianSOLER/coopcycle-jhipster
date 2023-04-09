import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserCoopcycleFormService } from './user-coopcycle-form.service';
import { UserCoopcycleService } from '../service/user-coopcycle.service';
import { IUserCoopcycle } from '../user-coopcycle.model';
import { IMember } from 'app/entities/member/member.model';
import { MemberService } from 'app/entities/member/service/member.service';

import { UserCoopcycleUpdateComponent } from './user-coopcycle-update.component';

describe('UserCoopcycle Management Update Component', () => {
  let comp: UserCoopcycleUpdateComponent;
  let fixture: ComponentFixture<UserCoopcycleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userCoopcycleFormService: UserCoopcycleFormService;
  let userCoopcycleService: UserCoopcycleService;
  let memberService: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserCoopcycleUpdateComponent],
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
      .overrideTemplate(UserCoopcycleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserCoopcycleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userCoopcycleFormService = TestBed.inject(UserCoopcycleFormService);
    userCoopcycleService = TestBed.inject(UserCoopcycleService);
    memberService = TestBed.inject(MemberService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Member query and add missing value', () => {
      const userCoopcycle: IUserCoopcycle = { id: 456 };
      const member: IMember = { id: 76345 };
      userCoopcycle.member = member;

      const memberCollection: IMember[] = [{ id: 83260 }];
      jest.spyOn(memberService, 'query').mockReturnValue(of(new HttpResponse({ body: memberCollection })));
      const additionalMembers = [member];
      const expectedCollection: IMember[] = [...additionalMembers, ...memberCollection];
      jest.spyOn(memberService, 'addMemberToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userCoopcycle });
      comp.ngOnInit();

      expect(memberService.query).toHaveBeenCalled();
      expect(memberService.addMemberToCollectionIfMissing).toHaveBeenCalledWith(
        memberCollection,
        ...additionalMembers.map(expect.objectContaining)
      );
      expect(comp.membersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userCoopcycle: IUserCoopcycle = { id: 456 };
      const member: IMember = { id: 14148 };
      userCoopcycle.member = member;

      activatedRoute.data = of({ userCoopcycle });
      comp.ngOnInit();

      expect(comp.membersSharedCollection).toContain(member);
      expect(comp.userCoopcycle).toEqual(userCoopcycle);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCoopcycle>>();
      const userCoopcycle = { id: 123 };
      jest.spyOn(userCoopcycleFormService, 'getUserCoopcycle').mockReturnValue(userCoopcycle);
      jest.spyOn(userCoopcycleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCoopcycle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userCoopcycle }));
      saveSubject.complete();

      // THEN
      expect(userCoopcycleFormService.getUserCoopcycle).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userCoopcycleService.update).toHaveBeenCalledWith(expect.objectContaining(userCoopcycle));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCoopcycle>>();
      const userCoopcycle = { id: 123 };
      jest.spyOn(userCoopcycleFormService, 'getUserCoopcycle').mockReturnValue({ id: null });
      jest.spyOn(userCoopcycleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCoopcycle: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userCoopcycle }));
      saveSubject.complete();

      // THEN
      expect(userCoopcycleFormService.getUserCoopcycle).toHaveBeenCalled();
      expect(userCoopcycleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserCoopcycle>>();
      const userCoopcycle = { id: 123 };
      jest.spyOn(userCoopcycleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userCoopcycle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userCoopcycleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMember', () => {
      it('Should forward to memberService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(memberService, 'compareMember');
        comp.compareMember(entity, entity2);
        expect(memberService.compareMember).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
