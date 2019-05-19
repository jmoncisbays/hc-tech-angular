import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatCardModule, MatIconModule,
  MatInputModule, MatListModule, MatSidenavModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { EmployeeListComponent, DialogDelete } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DialogDelete,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule, 
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogDelete
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
