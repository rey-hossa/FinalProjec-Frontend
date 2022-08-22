import { Component, OnInit } from '@angular/core';

import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  data:any;
  token: any;
  user: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router:Router) { }

  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required] ]
    })
  }

  ngOnInit(): void {
    this.loginForm();
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    this.submitted = true;

    if(this.form.invalid){
      return; 
      
    }

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res;
      console.log(res);
      if(this.data.status === 1){
        this.token = this.data.data.token;
        this.user = this.data.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.user);
        this.router.navigate(['/ecommerce']);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      } else if(this.data.status === 0){
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    });
  }

}
