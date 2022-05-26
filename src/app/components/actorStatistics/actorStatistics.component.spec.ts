import {TestBed } from '@angular/core/testing';

import { ActorStatisticsComponent } from './actorStatistics.component';
import {TestUtilities} from "../../shared/test/TestUtilities";

describe('ActorStatisticsComponent', () => {
  let actorStatisticsComponent: ActorStatisticsComponent;

  const statisticsServiceSpy = TestUtilities.createStatisticsServiceSpy();
  const liveAnnouncerSpy = TestUtilities.createLiveAnnouncerSpy();

  beforeEach(async () => {
    actorStatisticsComponent = new ActorStatisticsComponent(statisticsServiceSpy,liveAnnouncerSpy);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: []
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(actorStatisticsComponent).toBeTruthy();
  });
});
