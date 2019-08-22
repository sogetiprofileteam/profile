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
    private _profileImageService: ProfileImageService
   // private blobStorage: ProfileImagesService,
  ) { }

  destroy$ = new Subject();
  consultant$ = this.consultantStore.consultant$;

  selectedFile: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  sas: string = '?sv=2018-03-28&ss=b&srt=sco&sp=rwlacu&st=2019-08-13T19%3A36%3A10Z&se=2019-09-14T19%3A36%3A00Z&sig=2tv54y9CZt9TEmW6KHxzXR0TOOgvsRN94rT3Hzg8LPk%3D';

  //private baseurl = environment.api + '/api/FileUpload/SaveFile/';

  //private baseurl = environment.api + '/api/FileUpload/SaveFile/';
  private baseurl = environment.api + '/saveFile';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = <File>this.imageChangedEvent.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
    const formData = new FormData();
    formData.append(this.selectedFile.name, this.selectedFile, this.selectedFile.name);
    //this._profileImageService.uploadFile('', this.selectedFile);
    // this._profileImageService.postTest(this.selectedFile)
    this._profileImageService.postImages(formData)
      .subscribe(res => {
        console.log(res);
      })

  }

  /*
   // Enter your storage account name and shared key
    account = "profileappphotostorage";
    accountKey = "Rz4Bva3VkAipBe2pTE3rGKJyXJYUx9cG4AunSRBC5S9p1EFebeaMFAp3V1jIoCoNc3g+GTjuoDz7PCcFj089SA==";

      // Use SharedKeyCredential with storage account and account key
   sharedKeyCredential = new SharedKeyCredential(this.account, this.accountKey);

      // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
   pipeline = StorageURL.newPipeline(this.sharedKeyCredential);



   serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${this.account}.blob.core.windows.net`,
    this.pipeline
  );

  // Create a container
  async uploadProfile(){
  const containerName = 'images';
  const containerURL = ContainerURL.fromServiceURL(this.serviceURL, containerName);

  const content = this.selectedFile;
  const blobName = this.selectedFile.name + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.none,
    content,
    content.size
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
  }

*/

}
