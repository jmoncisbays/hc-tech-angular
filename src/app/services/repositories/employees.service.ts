import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Employee } from '../../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private webApi: WebApiService) { }

  getAll(): Observable<Employee[]> {
    return this.webApi.employees_GetAll();
  }

  get(id: number): Observable<Employee> {
    return this.webApi.employees_Get(id);
  }

  add(employee: Employee): Observable<string> {
    return this.webApi.employees_Add(employee);
  }

  update(id: number, employee: Employee): Observable<string> {
    return this.webApi.employees_Update(id, employee);
  }

  delete(id: number): Observable<string> {
    return this.webApi.employees_Delete(id);
  }
}
