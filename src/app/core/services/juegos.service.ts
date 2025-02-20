import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class JuegosService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAllByUsuario(idUsuario: number): Observable<any> {
        let urlService = `${this.url}Juego/${idUsuario}`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        )

    }

    public Create(element: any): Observable<any> {
        let urlService = `${this.url}Juego/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
}
