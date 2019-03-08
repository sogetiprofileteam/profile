import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() public uploadUri = '';
  @Output() public uploaded = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  public async onChange(files: FileList) {
    const file = files.item(0);
    const result = await this.http.post<string>(this.uploadUri, file).toPromise();
    this.uploaded.emit(result);
  }
}
