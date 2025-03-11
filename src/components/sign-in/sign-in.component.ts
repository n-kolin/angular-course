import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Role } from '../../models/role.enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    NgTemplateOutlet,
    MatIconModule,

    RouterLink,


  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  res!: any

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService,
    private cookieService: CookieService, private router: Router, private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<SignInComponent>
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(data => {
        console.log(data)
        this.res = data

        // this.cookieService.set("accessToken",data.token)
        // this.cookieService.set("id",data.userId)
        // console.log(data.userId);
        // console.log(this.cookieService.get("id"));

        // this.setCookie(data.token, data.userId).then(() => {


        this.cookieService.set("accessToken", data.token);
        this.cookieService.set("id", data.userId);
        this.dialogRef.close(true);
        

      },(e)=>{
        this.dialogRef.close(false);
        alert("Error: logintion failed");
        console.log(e);
      }

      );
      


    }
  }

  closeDialog(){
    this.dialogRef.close(true);

  } 

}
