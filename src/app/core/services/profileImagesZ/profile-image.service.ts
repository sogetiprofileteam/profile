import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  // dependency injection
  constructor(private _httpClient: HttpClient) { }

  private baseurl =  environment.api + '/profilepics';

  // change from any to type image.
  public getImages(): Observable<any> {
    return this._httpClient.get(this.baseurl);
  }

  // Form Data as image to pass to API to be pushed to Azure Storage
  public postImages(formData: FormData): Observable<any> {
    const saveImageUrl = this.baseurl + '/SaveFile';
    return this._httpClient.post(saveImageUrl, formData);
    // .subscribe(load image and return status's here)
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
}
