
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChartModule} from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';


import { AppComponent } from './app.component';
import { AppService } from './app.service';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    KeyFilterModule,
    MultiSelectModule,
    ChartModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
