import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserCoopcycleComponent } from './list/user-coopcycle.component';
import { UserCoopcycleDetailComponent } from './detail/user-coopcycle-detail.component';
import { UserCoopcycleUpdateComponent } from './update/user-coopcycle-update.component';
import { UserCoopcycleDeleteDialogComponent } from './delete/user-coopcycle-delete-dialog.component';
import { UserCoopcycleRoutingModule } from './route/user-coopcycle-routing.module';

@NgModule({
  imports: [SharedModule, UserCoopcycleRoutingModule],
  declarations: [UserCoopcycleComponent, UserCoopcycleDetailComponent, UserCoopcycleUpdateComponent, UserCoopcycleDeleteDialogComponent],
})
export class UserCoopcycleModule {}
