import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserCoopcycleService } from '../service/user-coopcycle.service';

import { UserCoopcycleComponent } from './user-coopcycle.component';

describe('UserCoopcycle Management Component', () => {
  let comp: UserCoopcycleComponent;
  let fixture: ComponentFixture<UserCoopcycleComponent>;
  let service: UserCoopcycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'user-coopcycle', component: UserCoopcycleComponent }]), HttpClientTestingModule],
      declarations: [UserCoopcycleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(UserCoopcycleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserCoopcycleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UserCoopcycleService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.userCoopcycles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to userCoopcycleService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUserCoopcycleIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUserCoopcycleIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
