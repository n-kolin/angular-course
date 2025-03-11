import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { HomeComponent } from "../home/home.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RoleIconPipe } from '../../pipes/role-icon.pipe';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    MatDialogModule,
    RoleIconPipe,


  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  user!: User | undefined
  id!: number | undefined


  constructor(private cookieService: CookieService, private router: Router, private userService: UserService,
    private dialog: MatDialog
  ) {

  }


  ngOnInit(): void {
    this.getId().then(() => {
      console.log(this.id, this.user);

    })
  }

  myCourses() {
    console.log('my');

    this.getId().then(() => {

      console.log('???');

      if (this.id) {
        this.router.navigateByUrl('/course/stud/' + this.id);
        console.log('/course/stud/' + this.id);
      }
      else
        console.log('user is not connect');

      console.log(this.id);

    }).catch((e) => {
      console.log(e);

    })


  }
  allCourses() {
    this.getId().then(() => {

      if (this.id)
        this.router.navigateByUrl('/course/stud/all');
      else
        console.log('user is not connect');

    })

  }

  getId(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.getCookie().then((id) => {
          this.id = Number(id);
          console.log('gid', this.id);

          this.userService.getUserById(Number(id)).subscribe((data) => {
            this.user = data
          })
        })
      } catch (error) {
        reject(error);
      }
    });

  }

  getCookie(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const id = this.cookieService.get("id")
        console.log('c', id);

        resolve(id);
      } catch (error) {
        reject(error);
      }
    });
  }
  logOut() {

    this.cookieService.delete("accessToken");
    this.cookieService.delete("id");
    this.id = undefined;
    this.user = undefined;
    this.router.navigateByUrl('');


  }


  openSignUp() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'centered-dialog',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getId().then(() => {
          console.log(this.id, this.user);

        })
      }

    });
  }
  openSignIn() {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'centered-dialog',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getId().then(() => {
          console.log(this.id, this.user);

        })
      }

    });
  }

}
