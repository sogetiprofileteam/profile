import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-technical-skills',
  templateUrl: './consultant-technical-skills.component.html',
  styleUrls: ['./consultant-technical-skills.component.scss']
})
export class ConsultantTechnicalSkillsComponent implements OnInit {

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
