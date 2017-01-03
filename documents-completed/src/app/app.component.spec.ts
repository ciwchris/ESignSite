/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule, NgForm } from '@angular/forms';

import { COMPLETEDDOCUMENTS } from './mock-completed-documents';
import { CompletedDocumentsService } from './completed-documents.service';

import { MaxDateDirective } from './validators/max-date.directive';
import { MinDateDirective } from './validators/min-date.directive';
import { MaxDirective } from './validators/max.directive';
import { MinDirective } from './validators/min.directive';
import { AccordionModule } from 'ng2-accordion';

class CompletedDocumentsServiceSpy {
    getCompletedDocuments = jasmine.createSpy('getCompletedDocuments').and.callFake(
        () => Promise
            .resolve(true)
            .then(() => Object.assign({}, COMPLETEDDOCUMENTS))
    );

}

fdescribe('AppComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AccordionModule, FormsModule],
            declarations: [AppComponent, MaxDateDirective, MinDateDirective, MinDirective, MaxDirective]
        });
        TestBed.overrideComponent(AppComponent, {
            set: {
                providers: [
                    { provide: CompletedDocumentsService, useClass: CompletedDocumentsServiceSpy }
                ]
            }
        })

            .compileComponents();
        TestBed.compileComponents();
    }));

    fit('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app works!'`, async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));

    it('should render title in a h1 tag', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
});
