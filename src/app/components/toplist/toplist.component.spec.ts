import { TestBed } from '@angular/core/testing';

import { ToplistComponent } from './toplist.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {FormBuilder} from "@angular/forms";

describe('ToplistComponent', () => {
  const authServiceSpy = TestUtilities.createAuthServiceSpy();
  const tmdbServiceSpy = TestUtilities.createTmdbServiceSpy();
  const matDialogSpy = TestUtilities.createMatDialogServiceSpy();
  const toplistStoreSpy = TestUtilities.createToplistStoreSpy();

  let toplistComponent: ToplistComponent;

  beforeEach(async () => {
    toplistComponent = new ToplistComponent(authServiceSpy, new FormBuilder(), tmdbServiceSpy, matDialogSpy, toplistStoreSpy)
    await TestBed.configureTestingModule({
      declarations: []
    });
  });

  it('should create', () => {
    expect(toplistComponent).toBeTruthy();
  });
});
