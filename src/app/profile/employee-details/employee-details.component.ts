import { Component, OnInit } from '@angular/core';
import { Employee, ProductResolved } from 'src/app/models/employee';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
 
  pageTitle = 'Employee Detail';
  employee: Employee | null = null;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void
 {
    const resolvedData: ProductResolved =this.route.snapshot.data['resolvedData'];

    this.errorMessage = String(resolvedData.error);

    this.onEmployeeRetrieved(resolvedData.employee);
    console.log('error message', this.errorMessage)
  }

  onEmployeeRetrieved(employee: Employee | null): void {
    this.employee = employee;
  if (this.employee) {
      this.pageTitle = `Employee Details of : ${this.employee.name}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }


  doRouting(): void {
    this.router.navigate(
      ['/products'],
      { queryParamsHandling: "preserve", queryParams: { message: '' } }
    );
    // [routerLink]="['/products']"
    // queryParamsHandling="preserve"
  }
}
