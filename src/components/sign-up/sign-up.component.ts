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
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  res!: any
  // userId = 0
  // user :User = {
  //   'id':0,
  //   'name':'',
  //   'email':'',
  //   'password':'',
  //   'role':Role.Student,
  // }





  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService, 
    private cookieService:CookieService,private router:Router,private activatedRoute:ActivatedRoute,
    private dialogRef:MatDialogRef<SignUpComponent>
  ) { }

  ngOnInit() {

    


    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [Role.Student, Validators.required]
    });

    
  }

  register() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(data => {
        console.log(data)
        this.res = data

        // this.cookieService.set("accessToken",data.token)
        // this.cookieService.set("id",data.userId)
        // this.router.navigateByUrl('/user/',data.userId)
        // this.setCookie(data.token, data.userId).then(() => {
        //   // ניתוב לאחר שהקוקי מעודכן
        //   this.router.navigateByUrl('');
        //   console.log("success", data);
        // })
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
