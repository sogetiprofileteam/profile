import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Consultant } from '@core/models';
import { NotificationsService } from '@core/services/notifications/notifications.service';

import { from, Observable } from 'rxjs';
import { combineAll, map } from 'rxjs/operators';
import { ISasToken } from '../../../../core/services/profileImages/profile-images';
//import { ProfileImagesService } from '../../../../core/services/profileImages/profile-images.service';
import { environment } from '@env/environment';
import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  AnonymousCredential,
  TokenCredential,
 // SharedKeyCredential
} from "@azure/storage-blob";
import { ProfileImageService } from '@core/services/profileImagesZ/profile-image.service';
import { FormGroup, FormBuilder } from '@angular/forms';


interface IUploadProgress {
  filename: string;
  progress: number;
}


@Component({
  selector: 'app-consultant-picture-edit',
  templateUrl: './consultant-picture-edit.component.html',
  styleUrls: ['./consultant-picture-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantPictureEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private notification: NotificationsService,
    private dialogRef: MatDialogRef<ConsultantPictureEditComponent>,
    private http: HttpClient,
    private _profileImageService: ProfileImageService,
    private formBuilder: FormBuilder
   // private blobStorage: ProfileImagesService,
  ) { }

  ngOnInit(){
    this.uploadForm = this.formBuilder.group({
      profilePic: ['']
    });
  }

  destroy$ = new Subject();
  consultant$ = this.consultantStore.consultant$;

  selectedFile: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  sas: string = '?sv=2018-03-28&ss=b&srt=sco&sp=rwlacu&st=2019-08-13T19%3A36%3A10Z&se=2019-09-14T19%3A36%3A00Z&sig=2tv54y9CZt9TEmW6KHxzXR0TOOgvsRN94rT3Hzg8LPk%3D';

  //private baseurl = environment.api + '/api/FileUpload/SaveFile/';

  //private baseurl = environment.api + '/api/FileUpload/SaveFile/';
  private baseurl = environment.api + '/saveFile';
  uploadForm: FormGroup;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = <File>this.imageChangedEvent.target.files[0];
    this.uploadForm.get('profilePic').setValue(this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //this.selectedFile = <File>this.croppedImage.target.files[0];
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateConsultant(consultant: Consultant): void {
    if (this.croppedImage.length > 0) {
      const updatedData: Consultant = {
        ...consultant,
        urlProfileImage: this.croppedImage
      };
        this.consultantStore.updateConsultant(updatedData)
           .pipe(takeUntil(this.destroy$))
           .subscribe(() => this.close(), () => this.notification.notificationsBar('Error: Profile picture did not upload!', 'error'), () =>  this.notification.notificationsBar('Profile Picture Uploaded Successfully!', 'success'));
    }
  }

  // -------------------Testing azure blob ------------------------------------------------
  test(){
    //const file = new File([this.selectedFile],this.selectedFile.name);
    const formData = new FormData();
    formData.append(this.selectedFile.name, this.selectedFile, this.selectedFile.name)
    this._profileImageService.postImages(formData)
      .subscribe(res => {
        console.log(res);
      })


  }


}
