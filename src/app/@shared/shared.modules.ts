import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { QuestionComponent } from "./question/question.component";

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  exports: [CommonModule,RouterModule,HttpClientModule,FormsModule],
  declarations: [QuestionComponent]
})

export class SharedModule {}
