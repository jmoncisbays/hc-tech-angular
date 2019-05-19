import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, AbstractControl, ValidatorFn } from "@angular/forms"
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { Employee } from '../../models/employee';
import { EmployeesService  } from '../../services/repositories/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeId: number;

  // default picture
  pictureBase64: string = "data:image/jpeg;base64,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";
  isNewEmployee: boolean = true;
  employeeForm: FormGroup;
  matcher = new EmployeeErrorStateMatcher();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private repo: EmployeesService, private snackBar: MatSnackBar) {
    this.employeeForm = new FormGroup({
      'fullName': new FormControl('', [
        Validators.required,
        Validators.maxLength(150)
      ]),
      'age': new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(75)
      ]),
      'cityCode': new FormControl('', [
        Validators.required,
        Validators.maxLength(3)
      ]),
      'email': new FormControl('', [
        Validators.email,
        Validators.maxLength(150)
      ]),
      'salary': new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(10000),
      ])
    });
  }

  ngOnInit() {
    // ? form for a new user
    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      return;
    }
    
    this.isNewEmployee = false;
    let id: any = this.activatedRoute.snapshot.paramMap.get('id');
    if (Number.isNaN(+id)) {
      this.snackBar.open("Employee ID should be numeric", "", {
        duration: 2000
      });
      return;
    }

    this.employeeId = +id;
    this.repo.get(this.employeeId).subscribe(data => {
      this.employeeForm.patchValue(data);
      this.pictureBase64 = data.pictureBase64;
    }, (error => {
      this.snackBar.open(error, "", {
        duration: 2000
      });
    }));
  }

  get fullNameControl() {
    return this.employeeForm.get("fullName");
  }

  get ageControl() {
    return this.employeeForm.get("age");
  }

  get cityCodeControl() {
    return this.employeeForm.get("cityCode");
  }

  get emailControl() {
    return this.employeeForm.get("email");
  }

  get salaryControl() {
    return this.employeeForm.get("salary");
  }

  save() {
    let employee: Employee = this.employeeForm.value;
    employee.pictureBase64 = this.pictureBase64;

    // ? new employee
    if (this.isNewEmployee) {
      employee.id = 0;
      this.repo.add(employee).subscribe(data => {
        this.router.navigate(['/employees']);
      }, (error => {
        this.snackBar.open(error, "", {
          duration: 2000
        });
      }));
    }
    else {
      employee.id = this.employeeId;
      this.repo.update(this.employeeId, employee).subscribe(data => {
        this.router.navigate(['/employees']);
      }, (error => {
        this.snackBar.open(error, "", {
          duration: 2000
        });
      }));
    }
  }

  pictureOnChange(event) {
    if(event.target.files && event.target.files.length == 1) {
        let file = event.target.files[0];
        if(file.type != "image/jpeg") {
            event.target.value = "";
            this.snackBar.open("The picture file is not valid. Please select a .JPG file", "", {
                duration: 2000
            });
            return;                    
        }
        let reader: FileReader = new FileReader();
        reader.onloadend = () => {
            //this.pictureBase64 = reader.result.toString() //.split(',')[1];
            //console.log(reader.result.toString().split(',')[1]);
            //console.log(reader.result);
            this.pictureBase64 = reader.result.toString();
        }
        //reader.readAsText(file);
        reader.readAsDataURL(file);
    }
  }

}

class EmployeeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
