import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  constructor(private dialogService: DialogService) {}

  openErrorDialog(errorMessage: string): void {
    this.dialogService.open(ErrorDialogComponent, {
      header: 'Error',
      width: 'max(600px, 350px)',
      data: {
        message: errorMessage,
      },
    });
  }
}
