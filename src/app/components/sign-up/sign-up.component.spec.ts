import {ComponentFixture, TestBed} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('SignUpComponent', () => {
  let signUpComponent: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;


  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    signUpComponent = new SignUpComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    signUpComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(signUpComponent).toBeTruthy();
  });
});
