/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompletedDocumentsService } from './completed-documents.service';

describe('CompletedDocumentsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CompletedDocumentsService]
        });
    });

    it('should ...', inject([CompletedDocumentsService], (service: CompletedDocumentsService) => {
        expect(service).toBeTruthy();
    }));
});
