import { Injectable } from '@angular/core';
import { ProfileImage } from './../../models/profileImage';
import { environment } from 'environments/environment';
import * as Azure from '@azure/storage-blob';

declare var AzureStorage: any;

@Injectable({
  providedIn: 'root'
})
export class ProfileImagesService {

  private blobContainerUrl: string;
  constructor() {
  // this.blobContainerUrl = 'https://' + environment.azureContainers.profileImage + '.' + environment.azureContainers.baserUrl;
   }

   getPlaylist(): Promise<ProfileImage[]> {

     const blobService = AzureStorage.createBlobServiceAnonymous(this.blobContainerUrl);
     return new Promise(resolve => {
       blobService.getBlobToText('profileImage', 'images.json', function(err, blobContent, blob){
         resolve(JSON.parse(blobContent));
       });
     });

   }
}

//----------------------------------Theory 2-------------------------------

// import { Inject, Injectable } from '@angular/core';
// import { Observable, Subscriber } from 'rxjs';
// import { distinctUntilChanged, startWith } from 'rxjs/operators';
// import {
//   BLOB_STORAGE_TOKEN,
//   IBlobService,
//   IBlobStorage,
//   ISasToken,
//   ISpeedSummary
// } from './profile-images';
// import { environment } from '@env/environment';


// @Injectable()
// export class ProfileImagesService {
//   constructor(@Inject(BLOB_STORAGE_TOKEN) private blobStorage: IBlobStorage) {}

//   private baseurl = environment.api + '/api/FileUpload/SaveFile';

//   uploadToBlobStorage(sasToken: ISasToken, file: File): Observable<number> {
//     const customBlockSize = this.getBlockSize(file);
//     const options = { blockSize: customBlockSize };
//     const blobService = this.createBlobService(sasToken.storageAccessToken, sasToken.storageUri);

//     blobService.singleBlobPutThresholdInBytes = customBlockSize;

//     return this.uploadFile(blobService, sasToken, file, options);
//   }

//   private createBlobService(accessToken: string, blobUri: string): IBlobService {
//     return this.blobStorage
//       .createBlobServiceWithSas(blobUri, accessToken)
//       .withFilter(new this.blobStorage.ExponentialRetryPolicyFilter());
//   }

//   private uploadFile(
//     blobService: IBlobService,
//     accessToken: ISasToken,
//     file: File,
//     options: { blockSize: number }
//   ): Observable<number> {
//     return new Observable<number>(observer => {
//       const speedSummary = blobService.createBlockBlobFromBrowserFile(
//         accessToken.container,
//         accessToken.filename,
//         file,
//         options,
//         error => this.callback(error, observer)
//       );
//       speedSummary.on('progress', () => this.getProgress(speedSummary, observer));
//     }).pipe(
//       startWith(0),
//       distinctUntilChanged()
//     );
//   }

//   private getProgress(speedSummary: ISpeedSummary, observer: Subscriber<number>): void {
//     const progress = parseInt(speedSummary.getCompletePercent(2), 10);
//     observer.next(progress === 100 ? 99 : progress);
//   }

//   private callback(error: any, observer: Subscriber<number>): void {
//     if (error) {
//       observer.error(error);
//     } else {
//       observer.next(100);
//       observer.complete();
//     }
//   }

//   private getBlockSize(file: File): number {
//     const size32Mb = 1024 * 1024 * 32;
//     const size4Mb = 1024 * 1024 * 4;
//     const size512Kb = 1024 * 512;

//     return file.size > size32Mb ? size4Mb : size512Kb;
//   }
//}

/*
//--------Theory 3-------------------------------------------------------------
import { Injectable } from '@angular/core';
import { ProfileImage } from './../../models/profileImage';
import { environment } from 'environments/environment';
import * as Azure from "@azure/storage-blob";

import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
  AnonymousCredential,
  TokenCredential
} from "@azure/storage-blob";

async function main() {
  // Enter your storage account name and shared key
  const account = "profileappphotostorage";
  const accountKey = "Rz4Bva3VkAipBe2pTE3rGKJyXJYUx9cG4AunSRBC5S9p1EFebeaMFAp3V1jIoCoNc3g+GTjuoDz7PCcFj089SA==";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use TokenCredential with OAuth token
  const tokenCredential = new TokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);

  // List containers
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let marker;
  do {
    const listContainersResponse = await serviceURL.listContainersSegment(
      Aborter.none,
      marker
    );

    marker = listContainersResponse.nextMarker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create(Aborter.none);
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(
    Aborter.none,
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // List blobs
  marker = undefined;
  do {
    const listBlobsResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      marker
    );

    marker = listBlobsResponse.nextMarker;
    for (const blob of listBlobsResponse.segment.blobItems) {
      console.log(`Blob: ${blob.name}`);
    }
  } while (marker);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  // Delete container
  await containerURL.delete(Aborter.none);

  console.log("deleted container");
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", data => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch(err => {
    console.log(err.message);
  });

  */
