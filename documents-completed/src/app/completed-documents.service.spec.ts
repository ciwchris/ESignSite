/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { CompletedDocumentsService } from './completed-documents.service';
import { Query } from './query';

describe('CompletedDocumentsService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CompletedDocumentsService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    describe('when getCompletedDocuments', () => {
        let backend: MockBackend;
        let service: CompletedDocumentsService;
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new CompletedDocumentsService(http);
        }));

        it('should have expected fake heroes (then)', async(inject([], () => {
            let options = new ResponseOptions({ status: 200, body: { data: {} } });
            response = new Response(options);
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            let query = new Query('1/1/2017', 0);
            service.getCompletedDocuments(query)
                .then(response => {
                    dump(response);
                });
        })));

        fit('should have expected fake heroes (then)', fakeAsync(inject([], () => {
            let options = new ResponseOptions({ status: 500 });
            response = new Response(options);
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            let query = new Query('1/1/2017', 0);
            service.getCompletedDocuments(query)
                .do(heroes => {
                    fail('should not respond with heroes');
                })
                .catch(err => {
                    expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                    return Observable.of(null); // failure is the expected test result
                })
                .toPromise();


            tick();

        })));
    });
});
