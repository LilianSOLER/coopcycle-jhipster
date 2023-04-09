import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserCoopcycleDetailComponent } from './user-coopcycle-detail.component';

describe('UserCoopcycle Management Detail Component', () => {
  let comp: UserCoopcycleDetailComponent;
  let fixture: ComponentFixture<UserCoopcycleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCoopcycleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userCoopcycle: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserCoopcycleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserCoopcycleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userCoopcycle on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userCoopcycle).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
