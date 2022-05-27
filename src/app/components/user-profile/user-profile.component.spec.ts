import {ComponentFixture, TestBed} from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {AuthService} from "../../shared/services/auth.service";

describe('UserProfileComponent', () => {
  let userProfileComponent: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    userProfileComponent = new UserProfileComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    userProfileComponent = fixture.componentInstance;
    authServiceSpy.userData = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      emailVerified: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(userProfileComponent).toBeTruthy();
  });
});
