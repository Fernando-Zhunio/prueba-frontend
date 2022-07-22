/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MethodsHttpService } from './methods-http.service';

describe('Service: MethodsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MethodsHttpService]
    });
  });

  it('should ...', inject([MethodsHttpService], (service: MethodsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
