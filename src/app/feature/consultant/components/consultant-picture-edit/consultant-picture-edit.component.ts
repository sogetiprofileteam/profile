import { Consultant } from '@core/models/consultant';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
//import { Consultant } from '@core/models';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { environment } from '@env/environment';
import { ProfileImageService } from '@core/services/profileImages/profile-image.service';

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
export class ConsultantPictureEditComponent implements OnDestroy, OnInit {
  urlProfileImage: any;
  constructor(
    private consultantStore: ConsultantStore,
    private notification: NotificationsService,
    private dialogRef: MatDialogRef<ConsultantPictureEditComponent>,
    private http: HttpClient,
    private _profileImageService: ProfileImageService,
  )
  {}
  consultant: Consultant;
  ngOnInit() {

  }

  destroy$ = new Subject();
  consultant$ = this.consultantStore.consultant$;
  storedURL: string;
  selectedFile: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  private baseurl = environment.api + '/profilepics/UploadFileAsync';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFile = <File>this.imageChangedEvent.target.files[0];
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
      this.consultantStore
        .updateConsultant(updatedData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => this.close(),
          () =>
            this.notification.notificationsBar(
              'Error: Profile picture did not upload!',
              'error'
            ),
          () =>
            this.notification.notificationsBar(
              'Profile Picture Uploaded Successfully!',
              'success'
            )
        );
    }
  }
  // -------------------Upload to Azure blob ------------------------------------------------
  uploadProfilePic() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this._profileImageService.postImages(formData).subscribe(res => {

      //Sends the Response, which should be a url to the picture within the blob to the Get function
      this.getProfilePic(res); // send data to getProfilePic function and assign it there
      console.log("this is the response " + res);
    });
  }


  //-------------------Get picture from Azure blob -------------------------------------------
  getProfilePic(data){
    this.storedURL = data;

      if(this.storedURL == null ){
        //.. do nothing
      }
      console.log("this.storedURL: " + this.storedURL);

      const updatedData: Consultant = {
        ...data,
        urlProfileImage: this.croppedImage
      }

      this.consultant$
          .pipe(
            switchMap(updatePicture => {
              return updatePicture
            //  ? this.consultantStore.updateConsultant(updatedData) //Try both of these in the debugging stage (uncomment the 3 lines below or vise versa)
                ? this.consultantStore.updateConsultant({
                    urlProfileImage: this.storedURL
                  })
                : of(null);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();


;  }
}
