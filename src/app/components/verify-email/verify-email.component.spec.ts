import {ComponentFixture, TestBed} from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('VerifyEmailComponent', () => {
  let verifyEmailComponent: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    verifyEmailComponent = new VerifyEmailComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    verifyEmailComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(verifyEmailComponent).toBeTruthy();
  });
});
