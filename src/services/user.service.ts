import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:3000/api/users"

  private authUrl = "http://localhost:3000/api/auth/"

  private UsersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$ = this.UsersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {

    this.http.get<User[]>(this.baseUrl).subscribe(data => {
      this.UsersSubject.next(data);
    });

  }
  getUserById(id: number): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  register(user: Omit<User, "id">) :Observable<any>{

    console.log(user);
    
    return this.http.post(this.authUrl + 'register', {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    
  }
  login(user: { email: string, password: string }) :Observable<any>{

    return this.http.post(this.authUrl + 'login', {
      email: user.email,
      password: user.password
    })
  }
  updateUser(id: number, user: User) {

    this.http.put(`${this.baseUrl}/${id}`,
      {
        'name': user.name,
        'email': user.email,
        'password': user.password,
        'role': user.role
      }).subscribe(() => {
        this.getUsers();
      })
  }
  deleteUser(id: number) {

    this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      this.getUsers();
    })
  }
}
