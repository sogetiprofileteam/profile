import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-save-new-button',
  templateUrl: './save-new-button.component.html',
  styleUrls: ['./save-new-button.component.scss']
})
export class SaveNewButtonComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore
  ) { }

  ngOnInit() {
  }

  save() {
    this.consultantStore.addNewConsultant();
    
  }

}
