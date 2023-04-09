import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserCoopcycle } from '../user-coopcycle.model';
import { UserCoopcycleService } from '../service/user-coopcycle.service';

@Injectable({ providedIn: 'root' })
export class UserCoopcycleRoutingResolveService implements Resolve<IUserCoopcycle | null> {
  constructor(protected service: UserCoopcycleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserCoopcycle | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userCoopcycle: HttpResponse<IUserCoopcycle>) => {
          if (userCoopcycle.body) {
            return of(userCoopcycle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
