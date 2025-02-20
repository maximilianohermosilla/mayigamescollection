import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class JuegosService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    public GetAllByUsuario(): Observable<any> {
        let userId = this.tokenService.getUserId();
        let urlService = `${this.url}/Juego/${userId}`;
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: any): Observable<any> {
        let urlService = `${this.url}/Juego/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
