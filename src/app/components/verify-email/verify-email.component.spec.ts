import { TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('VerifyEmailComponent', () => {
  let verifyEmailComponent: VerifyEmailComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    verifyEmailComponent = new VerifyEmailComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(verifyEmailComponent).toBeTruthy();
  });
});
