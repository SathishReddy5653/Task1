import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeResolverService } from './employee-resolver.service';
@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeListComponent
      },
      {
        path: ':id',
        component: EmployeeDetailsComponent,
        resolve: { resolvedData: EmployeeResolverService }
      },
      {
        path: ':id/edit',
        component: EmployeeEditComponent,
        resolve: { resolvedData: EmployeeResolverService },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: EmployeeEditComponent },]
      }
    ])
  ],
})

export class ProfileModule { }
