import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccordionModule } from 'ng2-accordion';

import { AppComponent } from './app.component';
import { MaxDateDirective } from './validators/max-date.directive';
import { MinDateDirective } from './validators/min-date.directive';
import { MinDirective } from './validators/min.directive';
import { MaxDirective } from './validators/max.directive';

@NgModule({
    declarations: [
        AppComponent,
        MaxDateDirective,
        MinDateDirective,
        MinDirective,
        MaxDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AccordionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
