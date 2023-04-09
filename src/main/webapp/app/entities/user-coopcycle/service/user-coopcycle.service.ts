import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserCoopcycle, NewUserCoopcycle } from '../user-coopcycle.model';

export type PartialUpdateUserCoopcycle = Partial<IUserCoopcycle> & Pick<IUserCoopcycle, 'id'>;

export type EntityResponseType = HttpResponse<IUserCoopcycle>;
export type EntityArrayResponseType = HttpResponse<IUserCoopcycle[]>;

@Injectable({ providedIn: 'root' })
export class UserCoopcycleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-coopcycles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userCoopcycle: NewUserCoopcycle): Observable<EntityResponseType> {
    return this.http.post<IUserCoopcycle>(this.resourceUrl, userCoopcycle, { observe: 'response' });
  }

  update(userCoopcycle: IUserCoopcycle): Observable<EntityResponseType> {
    return this.http.put<IUserCoopcycle>(`${this.resourceUrl}/${this.getUserCoopcycleIdentifier(userCoopcycle)}`, userCoopcycle, {
      observe: 'response',
    });
  }

  partialUpdate(userCoopcycle: PartialUpdateUserCoopcycle): Observable<EntityResponseType> {
    return this.http.patch<IUserCoopcycle>(`${this.resourceUrl}/${this.getUserCoopcycleIdentifier(userCoopcycle)}`, userCoopcycle, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserCoopcycle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserCoopcycle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserCoopcycleIdentifier(userCoopcycle: Pick<IUserCoopcycle, 'id'>): number {
    return userCoopcycle.id;
  }

  compareUserCoopcycle(o1: Pick<IUserCoopcycle, 'id'> | null, o2: Pick<IUserCoopcycle, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserCoopcycleIdentifier(o1) === this.getUserCoopcycleIdentifier(o2) : o1 === o2;
  }

  addUserCoopcycleToCollectionIfMissing<Type extends Pick<IUserCoopcycle, 'id'>>(
    userCoopcycleCollection: Type[],
    ...userCoopcyclesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userCoopcycles: Type[] = userCoopcyclesToCheck.filter(isPresent);
    if (userCoopcycles.length > 0) {
      const userCoopcycleCollectionIdentifiers = userCoopcycleCollection.map(
        userCoopcycleItem => this.getUserCoopcycleIdentifier(userCoopcycleItem)!
      );
      const userCoopcyclesToAdd = userCoopcycles.filter(userCoopcycleItem => {
        const userCoopcycleIdentifier = this.getUserCoopcycleIdentifier(userCoopcycleItem);
        if (userCoopcycleCollectionIdentifiers.includes(userCoopcycleIdentifier)) {
          return false;
        }
        userCoopcycleCollectionIdentifiers.push(userCoopcycleIdentifier);
        return true;
      });
      return [...userCoopcyclesToAdd, ...userCoopcycleCollection];
    }
    return userCoopcycleCollection;
  }
}
