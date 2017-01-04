/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { FormsModule, NgForm } from '@angular/forms';

import { COMPLETEDDOCUMENTS } from './mock-completed-documents';
import { CompletedDocumentsService } from './completed-documents.service';

import { MaxDateDirective } from './validators/max-date.directive';
import { MinDateDirective } from './validators/min-date.directive';
import { MaxDirective } from './validators/max.directive';
import { MinDirective } from './validators/min.directive';
import { AccordionModule } from 'ng2-accordion';

/*
class CompletedDocumentsServiceSpy {
    getCompletedDocuments = jasmine.createSpy('getCompletedDocuments').and.callFake(
        () => Promise
            .resolve(true)
            .then(() => Object.assign({}, COMPLETEDDOCUMENTS))
    );

}
*/

describe('AppComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AccordionModule, FormsModule, HttpModule],
            declarations: [AppComponent, MaxDateDirective, MinDateDirective, MinDirective, MaxDirective]
        });
        /*
        TestBed.overrideComponent(AppComponent, {
            set: {
                providers: [
                    { provide: CompletedDocumentsService, useClass: CompletedDocumentsServiceSpy }
                ]
            }
        }).compileComponents();
            */
        TestBed.compileComponents();
    }));

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('lookUp fails', fakeAsync(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        spyOn(app.completedDocumentsService, 'getCompletedDocuments').and.callFake(
            () => Promise.reject('error'));

        app.lookUp();
        tick();

        expect(app.completedDocuments.count).toBe(0);
        expect(app.submitted).toBeFalsy();
        expect(app.hasError).toBeTruthy();
        expect(app.hasResult).toBeFalsy();
    }));

    it('lookUp documents', fakeAsync(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        spyOn(app.completedDocumentsService, 'getCompletedDocuments').and.callFake(
            () => Promise.resolve({ count: 1, documents: [{}] })
        );

        app.lookUp();
        tick();

        expect(app.completedDocuments.count).toBe(1);
        expect(app.submitted).toBeFalsy();
        expect(app.hasError).toBeFalsy();
        expect(app.hasResult).toBeTruthy();
    }));

});
