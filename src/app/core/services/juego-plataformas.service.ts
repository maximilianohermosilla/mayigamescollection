import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plataforma } from '../interfaces/plataforma';

@Injectable()
export class JuegoPlataformasService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public GetAll(): Observable<Plataforma[]> {
        let urlService = `${this.url}/JuegoPlataforma/`
        return this.http.get<any>(urlService).pipe(
            catchError((error: any) => {
                return throwError(() => error);
            })
        );
    }

    public Create(element: Plataforma): Observable<any> {
        let urlService = `${this.url}/JuegoPlataforma/`

        return this.http.post<any>(urlService, element).pipe(map(data => {
            return data;
        }));
    }
    
    public Delete(element: Plataforma): Observable<any> {
        let urlService = `${this.url}/JuegoPlataforma/${element.id}`

        return this.http.delete<any>(urlService).pipe(map(data => {
            return data;
        }));
    }
}
