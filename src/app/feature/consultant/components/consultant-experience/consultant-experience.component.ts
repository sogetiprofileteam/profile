import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-experience',
  templateUrl: './consultant-experience.component.html',
  styleUrls: ['./consultant-experience.component.scss']
})
export class ConsultantExperienceComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  doSomething() {
    // replace/rename me
  }

}
