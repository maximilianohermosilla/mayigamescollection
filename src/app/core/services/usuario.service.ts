import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable()
export class UsuarioService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Usuario[]> {
        let urlService = `${this.url}/Usuario/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )
    }

    public GetById(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/Usuario/IdUsuario?Id=${id}`);
    }

    public Create(element: Usuario): Observable<any> {
        let urlService = `${this.url}/Usuario/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }

    public Update(element: Usuario): Observable<any> {
        let urlService = `${this.url}/Usuario?id=${element.id}`

        return this.http.put<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }

    public Delete(element: Usuario): Observable<any> {
        let urlService = `${this.url}/Usuario/${element.id}`

        return this.http.delete<any>(urlService).pipe(map(data => {
            return data;
        }));
    }
}
