import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../interfaces/usuario';

@Injectable()
export class LoginService {
    public url: string = environment.urlService;
    token: any;
    isLogin: boolean = false;
    currentUserSubject: BehaviorSubject<any>;

    jwtHelper = new JwtHelperService();
    decodeToken: any;
    expirationDate: any;
    isExpired: any;

    constructor(private http: HttpClient, private tokenService: TokenService) { 
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));        
    }

    public GetById(id: Number): Observable<any> {
        return this.http.get<any>(this.url + id);
    }

    public GetAll(): Observable<any> {
        return this.http.get<any[]>(this.url);
    }

    public Authenticate(usuario: Usuario): Observable<any> {
        let urlService = `${this.url}/Login`

        return this.http.post<any>(urlService, usuario).pipe(map(data => {
            this.decodeToken = this.jwtHelper.decodeToken(data.token);
            this.tokenService.setToken(data.token);
            this.tokenService.setUserName(this.decodeToken.unique_name);
            this.tokenService.setUserId(this.decodeToken.nameid);
            this.tokenService.setAuthorities(this.decodeToken.role);
            this.currentUserSubject.next(this.decodeToken);
            localStorage.setItem('curentUser', JSON.stringify(this.decodeToken));

            return this.decodeToken;
        }))
    }

    public LogOut(){
        this.tokenService.logOut();
    }
}
