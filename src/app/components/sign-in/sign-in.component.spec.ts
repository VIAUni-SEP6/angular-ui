import {ComponentFixture, TestBed} from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('SignInComponent', () => {
  let signInComponent: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    signInComponent = new SignInComponent(authServiceSpy)
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    signInComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(signInComponent).toBeTruthy();
  });
});
