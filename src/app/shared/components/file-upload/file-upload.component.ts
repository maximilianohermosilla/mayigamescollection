import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ImagenService } from 'src/app/core/services/imagen.service';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, FormsModule, FileUploadModule],
  providers: [ImagenService],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Output() emitFileUpload = new EventEmitter<any>();
  public uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private imagenService: ImagenService) { }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    this.emitFileUpload.emit();
  }

  onBasicUpload(event: any) {
    let formData = new FormData();

    if (event.files && event.files[0]) {
      formData.append('file', event.files[0]);

      this.imagenService.Create(formData, event?.files[0].name).subscribe(response => {
        this.emitFileUpload.emit(response.response);
        this.messageService.add({ severity: 'info', summary: `${response.message}: `, detail: `${response.response}` });
      });
    }
  }
}
