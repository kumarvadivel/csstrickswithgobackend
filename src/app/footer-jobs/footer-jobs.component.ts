import { jobcarddata } from './../data/jobcard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-jobs',
  templateUrl: './footer-jobs.component.html',
  styleUrls: ['./footer-jobs.component.css']
})
export class FooterJobsComponent {

  jobcarddata=jobcarddata;


}
