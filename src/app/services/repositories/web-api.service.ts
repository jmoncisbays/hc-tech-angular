import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { Employee } from '../../models/employee';

const url = environment.webapiUrl;
const headers = new HttpHeaders().set('Content-Type', 'application/json').set("crossDomain", "true");

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient: HttpClient) { }

  employees_GetAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${url}/api/employees`).pipe(catchError(this.handleError));
  }

  employees_Get(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${url}/api/employees/${id}`).pipe(catchError(this.handleError));
  }

  employees_Add(employee: Employee): Observable<string> {
    return this.httpClient.post(`${url}/api/employees`, employee, {
      headers: headers,
      responseType: 'text'
    }).pipe(catchError(this.handleError));
  }

  employees_Update(id: number, employee: Employee): Observable<string> {
    return this.httpClient.put(`${url}/api/employees/${id}`, employee, {
      headers: headers,
      responseType: 'text'
    }).pipe(catchError(this.handleError));
  }

  employees_Delete(id: number): Observable<string> {
    return this.httpClient.delete(`${url}/api/employees/${id}`, {
      headers: headers,
      responseType: 'text'
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string;

    // no response from WebAPI server
    if (error.status == 0) {
      errorMsg = "Please run the Backend application";
    }
    else if (error.status == 404) {
      errorMsg = "There is no employee with that Id";
    }
    else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMsg = error.error.message;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMsg = error.error;
    }
    // return an observable with a user-facing error message
    return throwError(errorMsg);
  };
}
