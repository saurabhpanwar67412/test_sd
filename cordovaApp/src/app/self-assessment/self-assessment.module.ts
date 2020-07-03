import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfAssessmentPageRoutingModule } from './self-assessment-routing.module';

import { SelfAssessmentPage } from './self-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfAssessmentPageRoutingModule
  ],
  declarations: [SelfAssessmentPage]
})
export class SelfAssessmentPageModule {}
