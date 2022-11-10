import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @ViewChild(NgForm) employeeForm?: NgForm;

  errorMessage = '';
  employee?: Employee;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      if (this.employeeForm) {
        this.employeeForm.reset();
      }

      this.employee = data['resolvedData'].employee;
    });
  }

}

