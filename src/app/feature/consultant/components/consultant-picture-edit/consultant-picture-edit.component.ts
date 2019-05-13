import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Consultant } from '@core/models';

@Component({
  selector: 'app-consultant-picture-edit',
  templateUrl: './consultant-picture-edit.component.html',
  styleUrls: ['./consultant-picture-edit.component.scss']
})
export class ConsultantPictureEditComponent implements OnDestroy {

  constructor(
    private consultantStore: ConsultantStore,
    private dialogRef: MatDialogRef<ConsultantPictureEditComponent>,
  ) { }

  destroy$ = new Subject();
  consultant$ = this.consultantStore.consultant$;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
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
        .subscribe(() => this.close());
    }
  }
}
