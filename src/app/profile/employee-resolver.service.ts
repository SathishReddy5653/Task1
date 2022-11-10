import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { DataserviceService } from './dataservice.service';
import { Employee, ProductResolved } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverService  {

  constructor(private dataService: DataserviceService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id)) {
      const message = `Employee id was not a number: ${id}`;
      console.error(message);
      return of({ employee: null, error: message });
    }

    return this.dataService.getEmployee(id)
      .pipe(
        map(employee => ({ employee, error: '' })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ employee: null, error: message });
        })
      );
  }

}
