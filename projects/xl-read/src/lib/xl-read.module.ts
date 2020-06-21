import { NgModule } from '@angular/core';
import { XlReadComponent } from './xl-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [XlReadComponent],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
  exports: [XlReadComponent]
})
export class XlReadModule { }
