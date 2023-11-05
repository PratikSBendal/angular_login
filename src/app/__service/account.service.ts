import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/__model/user';
import { Registration } from '@app/__model/registration';
import { ResDataModal } from '@app/__model/datatable';
import { environment } from 'src/env';

@Injectable({ providedIn: 'root' })

export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    constructor(
        private router: Router,
        private http: HttpClient
    ){
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();

    }
    public get userValue()
    {
        return this.userSubject.value;
    }
    login(username:string,password:string)
    {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`,{username,password})
        .pipe(map(user => {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('user', JSON.stringify(user));
                            this.userSubject.next(user);
                            return user;
            
        }))
    }
    logout()
    {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register1(user :User)
    {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    register(id:number,first_name:string,last_name:string,email:string,avatar:string)
    {
        return this.http.post<Registration>(`${environment.apiUrldumi}/data`,{id,first_name,last_name,email,avatar}).pipe(map((response :any)=>{
            console.log(response);
        }));
    }
    delete(id:number)
    {
        return this.http.delete<Registration>(`${environment.apiUrldumi}/data${id}`)
    }
    dataTable ()
    {
        return this.http.get<ResDataModal>(`https://reqres.in/api/users?page=2`).pipe(map((response : any)=>{
            console.log(response);
        }));
    }
}

