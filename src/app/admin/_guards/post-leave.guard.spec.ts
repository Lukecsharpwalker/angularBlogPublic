import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postLeaveGuard } from './unsaved-changes.guard';

describe('postLeaveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => postLeaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
