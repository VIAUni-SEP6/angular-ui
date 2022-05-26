import { TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('UserProfileComponent', () => {
  let userProfileComponent: UserProfileComponent;

  const authServiceSpy = TestUtilities.createAuthServiceSpy();

  beforeEach(async () => {
    userProfileComponent = new UserProfileComponent(authServiceSpy);
    await TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(userProfileComponent).toBeTruthy();
  });
});
