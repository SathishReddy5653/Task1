import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/profile/dataservice.service';
import { Employee, ProductResolved } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
//   @ViewChild(NgForm) employeeForm?: NgForm;

//   errorMessage = '';
//   employee?: Employee;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.route.parent?.data.subscribe(data => {
//       if (this.employeeForm) {
//         this.employeeForm.reset();
//       }

//       this.employee = data['resolvedData'].employee;
//     });
//   }

// }
pageTitle = 'Employee Edit';
  errorMessage = '';

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalEmployee) !== JSON.stringify(this.currentEmployee);
  }

  private currentEmployee: Employee | null = null;

  private originalEmployee: Employee | null = null;

  get employee(): Employee | null
 {
    return this.currentEmployee;
  }

  set employee(value: Employee | null) 
{
    this.currentEmployee = value;
    // Clone the object to retain a copy
    this.originalEmployee = value ? { ...value } : null;
  }

  constructor(private dataService: DataserviceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.data.subscribe(data =>
 {
      const resolvedData: ProductResolved = data['resolvedData'];
      this.errorMessage = String(resolvedData.error);
      this.onEmployeeRetrieved(resolvedData.employee);
    });

  }

  onEmployeeRetrieved(employee: Employee | null): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No product found';
    } else {
      if (this.employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${this.employee.name}`;
      }
    }
  }


  deleteProduct(): void
 {
    if (!this.employee || !this.employee.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.employee?.name} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.employee.name}?`)) {
        this.dataService.deleteProduct(this.employee.id).subscribe({
          next: () => this.onSaveComplete(`${this.employee?.name} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = {};
    this.currentEmployee = null;
    this.originalEmployee = null;
  }

  saveProduct(): void {
    if (this.employee&& this.isValid()) {
      if (this.employee.id === 0) {
        this.dataService.createEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(`The new ${this.employee?.name} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.dataService.updateProduct(this.employee).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.employee?.name} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    // if (message) {
    //   this.messageService.addMessage(message);
    // }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.employee &&
      this.employee.name &&
      this.employee.name.length >= 3 &&
      this.employee.age) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }
}
}