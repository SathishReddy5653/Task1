import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/profile/dataservice.service';
import { Employee } from 'src/app/models/employee';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // pageTitle = 'Employee List';
  // imageWidth = 50;
  // imageMargin = 2;
  // showImage = false;
  // errorMessage = '';

  // _listFilter = '';
  // get listFilter(): string {
  //   return this._listFilter;
  // }
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.employees;
  // }

  // filteredProducts: Employee[] = [];
  // employees: Employee[] = [];

  // constructor(private dataService: DataserviceService,
  //             private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
  //   this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

  //   this.dataService.getEmployees().subscribe({
  //     next: employees => {
  //       this.employees = employees;
  //       this.filteredProducts = this.performFilter(this.listFilter);
  //     },
  //     error: err => this.errorMessage = err
  //   });
  // }

  // performFilter(filterBy: string): Employee[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.employees.filter((employee: Employee) =>
  //     employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }

  // toggleImage(): void {
  //   this.showImage = !this.showImage;
  // }

  pageTitle = 'Employee List';
imageWidth = 50;
imageMargin = 2;
showImage = false;
errorMessage = '';

_listFilter = ' ';
get listFilter(): string
{
  return this._listFilter;
}
set listFilter(value: string)
{
  this._listFilter = value;
  this.filteredEmployees = this.listFilter ? this.performFilter(this.listFilter) : this.employees;
}

filteredEmployees: Employee[] = [];
employees: Employee[] = [];

constructor(private dataService: DataserviceService,
            private route: ActivatedRoute) { }

ngOnInit(): void {

  this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

  this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';


  this.dataService.getEmployees().subscribe({
    next: employees => {
      this.employees= employees;

      this.filteredEmployees = this.performFilter(this.listFilter);
    },
    error: err => this.errorMessage = err
  });
}

performFilter(filterBy: string): Employee[] 
{
  filterBy = filterBy.toLocaleLowerCase();
  return this.employees.filter((employee: Employee) =>
    employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

toggleImage(): void {
  this.showImage = !this.showImage;
}

}



