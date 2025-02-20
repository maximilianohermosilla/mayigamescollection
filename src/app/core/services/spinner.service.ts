import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public blockUI$ = new BehaviorSubject<boolean>(false);

  showSpinner(): void{
    this.blockUI$.next(true);
  }

  hideSpinner(): void{
    this.blockUI$.next(false);
  }  
}
