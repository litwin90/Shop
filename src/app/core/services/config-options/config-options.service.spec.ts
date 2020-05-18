import { TestBed } from '@angular/core/testing';

import { ConfigOptionsService } from './config-options.service';

describe('ConfigOptionsService', () => {
    let service: ConfigOptionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfigOptionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
