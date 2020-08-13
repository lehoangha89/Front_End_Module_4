import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import {TestPartnerComponent} from './partner-management/test-partner/test-partner.component';
import {HomeComponent} from './warehouse-management/home/home.component';
import {BrandManagementComponent} from './warehouse-management/brand-management/brand-management.component';
import {ProductComponent} from './warehouse-management/product/product.component';
import {EmployeeManagerComponent} from './employee-manager/employee-manager.component';
import {EmployeeDetailComponent} from './employee-manager/employee-detail/employee-detail.component';
import {ListDistributorComponent} from './partner-management/list-distributor/list-distributor.component';
// @ts-ignore
import {CustomerManagementComponent} from './partner-management/customer-management/customer-management.component';
import {AuthGuard} from '../auth/auth.guard';
import {BillComponent} from './warehouse-management/bill/bill.component';
import {ProductSaleComponent} from './sale-management/product-sale/product-sale.component';
import {SaleManagementComponent} from './partner-management/sale-management/sale-management.component';
import {ProductHaiSprint2Component} from './warehouse-management/product-hai-sprint2/product-hai-sprint2.component';
import {CakeDetailHaiComponent} from './warehouse-management/product-hai-sprint2/cake-detail-hai/cake-detail-hai.component';
import {ListCakeHaiComponent} from './warehouse-management/product-hai-sprint2/list-cake-hai/list-cake-hai.component';
import {ListGeneralHaiComponent} from "./warehouse-management/product-hai-sprint2/list-general-hai/list-general-hai.component";

import {SalesManagementComponent} from './sale-management/sale-management.component';
import {BrandStatisticalComponent} from "./warehouse-management/brand-management/brand-statistical/brand-statistical.component";
const routes: Routes = [{
  path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard],
  children: [
    {
      path: 'partner-management', component: PartnerManagementComponent, children: [
        {path: 'test', component: TestPartnerComponent},
        {path: 'list-distributor', component: ListDistributorComponent},
        {path: 'customer-management', component: CustomerManagementComponent},
        {
          path: 'employee-manager', component: EmployeeManagerComponent, children: [
            {path: 'detail', component: EmployeeDetailComponent}
          ]
        },
        {path: 'list-bill', component: SaleManagementComponent}
      ]
    },
    {
      path: 'warehouse-management', component: WarehouseManagementComponent, children: [
        {path: 'home', component: HomeComponent},
        {path: 'bill', component: BillComponent},
        {path: 'brand', component: BrandManagementComponent},
        {path: 'product', component: ProductComponent},
        {path: 'revenue-chart', component: BrandStatisticalComponent},
        {
          path: 'employee-manager', component: EmployeeManagerComponent, children: [
            {path: 'detail', component: EmployeeDetailComponent}
          ]
        },
        {
          path: 'product-hai-sprint2', component: ProductHaiSprint2Component, children: [
            {path: 'cake-detail-hai/:id', component: CakeDetailHaiComponent},
            {path: 'list-cake-hai', component: ListCakeHaiComponent},
            {path: 'list-general-hai', component: ListGeneralHaiComponent}
          ]
        }
      ]
    },
    {
      path: 'sale-management', component: SalesManagementComponent, children: [
        {path: 'product', component: ProductSaleComponent}
      ]
    }
  ]
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule {
}
