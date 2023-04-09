import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cooperative',
        data: { pageTitle: 'coopcycleJhipsterApp.cooperative.home.title' },
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CooperativeModule),
      },
      {
        path: 'member',
        data: { pageTitle: 'coopcycleJhipsterApp.member.home.title' },
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
      },
      {
        path: 'user-coopcycle',
        data: { pageTitle: 'coopcycleJhipsterApp.userCoopcycle.home.title' },
        loadChildren: () => import('./user-coopcycle/user-coopcycle.module').then(m => m.UserCoopcycleModule),
      },
      {
        path: 'restaurant',
        data: { pageTitle: 'coopcycleJhipsterApp.restaurant.home.title' },
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
      },
      {
        path: 'menu',
        data: { pageTitle: 'coopcycleJhipsterApp.menu.home.title' },
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
      },
      {
        path: 'item',
        data: { pageTitle: 'coopcycleJhipsterApp.item.home.title' },
        loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
      },
      {
        path: 'cart',
        data: { pageTitle: 'coopcycleJhipsterApp.cart.home.title' },
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
      },
      {
        path: 'delivery',
        data: { pageTitle: 'coopcycleJhipsterApp.delivery.home.title' },
        loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
