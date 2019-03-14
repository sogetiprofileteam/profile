import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantRoutingModule } from './consultant-routing.module';
import { MatFormFieldModule, MatDialog } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule} from '@angular/material/button';

import { ConsultantViewComponent } from './pages/consultant-view/consultant-view.component';
import { ConsultantHeaderComponent } from './components/consultant-header/consultant-header.component';
import { ConsultantBodyComponent } from './components/consultant-body/consultant-body.component';
import { ConsultantHeaderEditDialog } from './components/consultant-header-edit/consultant-header-edit-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConsultantViewComponent,
    ConsultantHeaderComponent,
    ConsultantBodyComponent,
    ConsultantHeaderEditDialog
  ],
  imports: [
    CommonModule,
    ConsultantRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [ConsultantHeaderEditDialog],
  providers: []
})
export class ConsultantModule { }
