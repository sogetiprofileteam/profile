import { TestBed } from '@angular/core/testing';

import { ProfileImagesService } from './profile-images.service';

describe('ProfileImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileImagesService = TestBed.get(ProfileImagesService);
    expect(service).toBeTruthy();
  });
});

//--------------------Theory 2--------------------------------

// import { TestBed } from '@angular/core/testing';
// import { BLOB_STORAGE_TOKEN } from './profile-images';
// import { blobStorageStub, uploadProgressStub } from './profile-images-stub';
// import { ProfileImagesService } from './profile-images.service';

// describe('BlobStorageService', () => {
//   let blobStorageService: ProfileImagesService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         ProfileImagesService,
//         {
//           provide: BLOB_STORAGE_TOKEN,
//           useValue: blobStorageStub
//         }
//       ]
//     });
//   });

//   beforeEach(() => {
//     blobStorageService = TestBed.get(ProfileImagesService);
//   });

//   describe('Upload File', () => {
//     it('should upload file and report progress', (done: DoneFn) => {
//       const uploadProgress = blobStorageService.uploadToBlobStorage(
//         {
//           container: '',
//           filename: '',
//           storageAccessToken: '',
//           storageUri: ''
//         },
//         <File>{
//           name: 'myAssetFileName',
//           size: 1024 * 1024 * 33
//         }
//       );

//       uploadProgress.subscribe(progress => {
//         expect(progress).toBe(uploadProgressStub);
//         if (progress === 100) {
//           done();
//         }
//       });
//     });

//     it('should catch error', (done: DoneFn) => {
//       const uploadProgress = blobStorageService.uploadToBlobStorage(
//         {
//           container: 'throwError',
//           filename: '',
//           storageAccessToken: '',
//           storageUri: ''
//         },
//         <File>{
//           name: 'myAssetFileName'
//         }
//       );

//       uploadProgress.subscribe(
//         progress => {},
//         error => {
//           expect(error).toBe('throwError');
//           done();
//         }
//       );
//     });
//   });
// });
