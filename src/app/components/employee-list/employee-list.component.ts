import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/repositories/employees.service';
import { Employee } from '../../models/employee';
import { MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pictureBase64', 'fullName', 'age', 'cityCode', 'email', 'salary', 'updateDelete'];
  dataSource: EmployeeForTable[];

  constructor(private repo: EmployeesService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadEmployees();
  }

  private delete(id: number) {
    this.repo.delete(id).subscribe(data => {
        this.loadEmployees();
        this.snackBar.open("Employee has been deleted", "", {
          duration: 2000
        });
      }, (error => {
        this.handleRepoError(error);
      }));
  }
  
  private loadEmployees() {
    this.repo.getAll().subscribe(data => {
      // map() needed in order to have access to the user id in Actions table column
      this.dataSource = data.map(e => {
        return {
          id: e.id,
          pictureBase64: e.pictureBase64,
          fullName: e.fullName,
          age: e.age,
          cityCode: e.cityCode,
          email: e.email,
          salary: e.salary,
          updateDelete: e.id
        };
      })
    }, (error => {
      this.handleRepoError(error);
    }));
  }

  handleRepoError(errorMsg: string) {
    this.snackBar.open(errorMsg, "", {
      duration: 2000
    });
  }

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(DialogDelete);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }
}

class EmployeeForTable extends Employee {
  public updateDelete: any;
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {}