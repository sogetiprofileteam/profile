import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  // dependency injection
  constructor(private _httpClient: HttpClient) {}

  private baseurl = environment.api + '/profilepics';

  // change from any to type image.
  public getImages(): Observable<any> {
    return this._httpClient.get(this.baseurl);
  }

  // Form Data as image to pass to API to be pushed to Azure Storage
  public postImages(formData: FormData, options?: any): Observable<any> {
    const saveImageUrl = this.baseurl + '/SaveFile';
  //use below to test UploadFileAsync Function
    // const saveImageUrl = this.baseurl + '/UploadFileAsync';
    console.log('in postImages function from service');
    return this._httpClient.post<any>(saveImageUrl, formData, options);
    // .subscribe(load image and return status's here)
  }

  // Same as above..testing to see if file makes a difference... soon to be depricated
  public postImagesUsingFile(file: File): Observable<any> {
    const saveImageUrl = this.baseurl + '/UploadFileAsync';
    console.log('in postImages function from service');
    return this._httpClient.post<File>(saveImageUrl, file);
    // .subscribe(load image and return status's here)
  }

  public postTest(file: File) {
    const url = this.baseurl + '/SaveFile';
    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this._httpClient.request(req);
  }

  public postImagesAsString(formData: FormData): Observable<any> {
    const saveImageAsStringUrl = this.baseurl + '/SaveAsString';
    return this._httpClient.post(saveImageAsStringUrl, formData);
    // .subscribe(load image and return status's here)
  }

  // Add this endpoint in api
  public putImages(formData: FormData): Observable<any> {
    const editImageUrl = this.baseurl + '/SaveFile';
    return this._httpClient.put(editImageUrl, formData);
    // .subscribe(load image and return status's here)
  }

  // file from event.target.files[0]
  uploadFile(url: string, file: File): Observable<HttpEvent<any>> {
    url = this.baseurl + '/SaveFile';
    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this._httpClient.request(req);
  }
}
