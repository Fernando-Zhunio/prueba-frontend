import { TestBed } from '@angular/core/testing';

import { MainResolver } from './main.resolver';

describe('MainResolver', () => {
  let resolver: MainResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MainResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
