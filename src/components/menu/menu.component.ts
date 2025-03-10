import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    HomeComponent,
    RouterOutlet,
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnDestroy{

  user!:User
  id!:number
  constructor(private cookieService:CookieService, private router:Router,private userService:UserService){

  }


  ngOnDestroy(): void {
    this.getCookie().then((id) => {
      this.userService.getUserById(Number(id)).subscribe((data) => {
        this.user = data
      })
      this.id = Number(id);
  })
  }
  navigate(){
    this.getCookie().then((id) => {
      // ניתוב לאחר שהקוקי מעודכן
      this.userService.getUserById(Number(id)).subscribe((data) => {
        this.user = data
      })
      this.id = Number(id);
  })
    
  }

  getCookie() :Promise<string>{
    return new Promise((resolve, reject) => {
      try {
          const id = this.cookieService.get("id")
          resolve(id);
      } catch (error) {
          reject(error);
      }
  });
  }

  f(){
    console.log('hjk');
    
  }
}
