import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagenService {
    public url: string = environment.urlService;

    constructor(private http: HttpClient) { }

    public Create(formData: any, id: string): Observable<any> {
        let urlService = `${this.url}/Image/`;
        let idToString = id.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
        return this.http.post<any>(`${urlService}?id=${idToString}`, formData).pipe(map(data => {
            return data;
        }));
    }
}
