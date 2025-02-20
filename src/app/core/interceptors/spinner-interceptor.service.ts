import { Injectable } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor{

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.spinnerService.showSpinner();
    
    return next.handle(req).pipe(
      
      //finalize(() => setTimeout(() => {this.spinnerService.hideSpinner()}, 1000))
      finalize(() => this.spinnerService.hideSpinner())
    );
  }
  
}
