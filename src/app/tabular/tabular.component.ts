
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import  employeeData from '../../assets/data/employeeData.json';
@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css'],
})
export class TabularComponent implements OnInit {
  employeeArr: Employee[]= employeeData;

  constructor() {
console.log(this.employeeArr)
  }

  ngOnInit(): void {}
}
