import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserCoopcycleComponent } from '../list/user-coopcycle.component';
import { UserCoopcycleDetailComponent } from '../detail/user-coopcycle-detail.component';
import { UserCoopcycleUpdateComponent } from '../update/user-coopcycle-update.component';
import { UserCoopcycleRoutingResolveService } from './user-coopcycle-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userCoopcycleRoute: Routes = [
  {
    path: '',
    component: UserCoopcycleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserCoopcycleDetailComponent,
    resolve: {
      userCoopcycle: UserCoopcycleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserCoopcycleUpdateComponent,
    resolve: {
      userCoopcycle: UserCoopcycleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserCoopcycleUpdateComponent,
    resolve: {
      userCoopcycle: UserCoopcycleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userCoopcycleRoute)],
  exports: [RouterModule],
})
export class UserCoopcycleRoutingModule {}
