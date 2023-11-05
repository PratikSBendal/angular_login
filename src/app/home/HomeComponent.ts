import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '@app/__service/account.service';

import { first } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  error?: string;
  dataTable: any;
  dtOptions: any;
  tableData = [];
  @ViewChild('dataTable', {static: true}) table: any;


  constructor(private formBuilder: FormBuilder, private accountService: AccountService
  ) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required],
      numberdelete: ['',Validators.required]
    });

  }
  get formone() { return this.myForm.controls; }

  onSubmit() {


    this.accountService.register(this.formone.id.value, this.formone.firstname.value, this.formone.lastname.value, this.formone.email.value, this.formone.avatar.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          // this.router.navigateByUrl(returnUrl);
          console.log("save");
        },
        error: error => {
          console.log("error");
        }
      });
  }
  deleteId() {
    this.accountService.delete(this.formone.numberdelete.value).pipe(first()).subscribe({});
  }

  // dataTableService()
  // {
  //    this.accountService.dataTable().pipe(first()).subscribe(data =>{
  //     this.tableData = data.data;
  //     this.dtOptions = {
  //       data: this.tableData,
  //       columns: [
  //         {title: 'ID', data: 'id'},
  //         {title: 'Email', data: 'email'},
  //         {title: 'First Name', data: 'first_name'},
  //         {title: 'Last Name', data: 'last_name'},
  //         {title: 'Avatar', data: 'avatar'},
  //       ]
  //     };
  //   }, err => {}, () => {
  //     this.dataTable = $(this.table.nativeElement);
  //     this.dataTable.DataTable(this.dtOptions);
  //   });
  // }
}
