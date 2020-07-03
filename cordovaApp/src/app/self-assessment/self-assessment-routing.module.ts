import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfAssessmentPage } from './self-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: SelfAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfAssessmentPageRoutingModule {}
