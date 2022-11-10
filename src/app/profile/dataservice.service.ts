import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, of, throwError, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../models/employee';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  private employeesUrl = '../../assets/data/employeeData.json'

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> 
{
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getEmployee(id: number): Observable<Employee> 
{
    if (id === 0) {
      return of(this.initializeEmployee());
    }
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  createEmployee(employee: Employee): Observable<Employee> 
{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Required for the in memory web API to assign a unique id
    employee.id = null;
    return this.http.post<Employee>(this.employeesUrl, employee, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  deleteProduct(id: number): Observable<{}> 
{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }


  updateProduct(employee: Employee): Observable<Employee> 
{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + employee.id)),
        // Return the product on an update
        map(() => employee),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never>
 {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }


  private initializeEmployee(): Employee{
    // Return an initialized object
    return {
      id: 0,
      name:'',
      age:0,
      salary:0,
      country:''
    };
  }
}
//   private employeesUrl = './../assets/data/employeeData.json';

//   constructor(private http: HttpClient) { }

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(this.employeesUrl)
//       .pipe(
//         tap(data => console.log(JSON.stringify(data))),
//         catchError(this.handleError)
      
//       );
    
//   }

//   getEmployee(id: number): Observable<Employee>
//    {
//     if (id === 0) {
//       return of(this.initializeEmployee());
//     }
//     const url = `${this.employeesUrl}/${id}`;
//     return this.http.get<Employee>(url)
//       .pipe(
//         tap(data => console.log('getProduct: ' + JSON.stringify(data))),
//         catchError(this.handleError)
//       );
//   }
  
//   private handleError(err: HttpErrorResponse): Observable<never> {
//     // in a real world app, we may send the server to some remote logging infrastructure
//     // instead of just logging it to the console
//     let errorMessage: string;
//     if (err.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       errorMessage = `Backend returned code ${err.status}: ${err.message}`;
//     }
//     console.error(err);
//     return throwError(() => errorMessage);
//   }
//   private initializeEmployee(): Employee {
//     // Return an initialized object
//     return {
//       id:0,
//       name:"",
//       age:25,
//       country:"",
//       salary:100000
//     };
//   }
// }



