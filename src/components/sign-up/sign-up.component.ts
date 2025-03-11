import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
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
    MatIconModule, 

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  

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
