import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Role } from '../../models/role.enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
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
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isVisible: boolean = false;
  isOpen: boolean = true;

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
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params) => {
      let status = params.get('status');
      if(status==='login')
        this.isVisible = true;
      if(status==='register')
        this.isVisible = false;
      this.isOpen = true;
      console.log(this.isVisible);
      
    });

    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   if (id) {
    //     this.userId = Number(id);
    //   }
    //   // else {
    //   //   console.error('Product ID not found');
    //   // }
    //   if(this.userId)
    //   this.userService.getUserById(this.userId).subscribe((data) => {
    //     this.user = data
    //     console.log(this.user);
    //     this.isOpen = true;

    //   })
    // });


    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [Role.Student, Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  register() {
    this.isOpen = false
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(data => {
        console.log(data)
        this.res = data

        // this.cookieService.set("accessToken",data.token)
        // this.cookieService.set("id",data.userId)
        // this.router.navigateByUrl('/user/',data.userId)
        this.setCookie(data.token, data.userId).then(() => {
          // ניתוב לאחר שהקוקי מעודכן
          this.router.navigateByUrl('/user/' + data.userId);
      })
        
      }

      );
      console.log(this.registerForm)
      console.log(this.res);



    }
  }

  login() {
    this.isOpen = false
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(data => {
        console.log(data)
        this.res = data

        // this.cookieService.set("accessToken",data.token)
        // this.cookieService.set("id",data.userId)
        // console.log(data.userId);
        // console.log(this.cookieService.get("id"));

        this.setCookie(data.token, data.userId).then(() => {
          // ניתוב לאחר שהקוקי מעודכן
          this.router.navigateByUrl('/user/' + data.userId);
      })
        
      }
      
    );
    // console.log(this.loginForm)
    // this.router.navigateByUrl('/user/'+this.cookieService.get("id"))

    }
  }
  // toggleForm() {
  //   // this.isVisible = !this.isVisible;
  //   this.openDialog(!this.isVisible)

  // }
  openDialog(val: boolean) {
    // this.dialog.open(this.dialogTemplate);
    this.isOpen = true
    this.isVisible = val;
  }
  closeDialog(){
    this.isOpen = false;
  }
  

  setCookie(token: string, userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            this.cookieService.set("accessToken", token);
            this.cookieService.set("id", userId);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
}
