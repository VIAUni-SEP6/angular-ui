import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorStatisticsComponent } from './actorStatistics.component';
import {TestUtilities} from "../../shared/test/TestUtilities";
import {StatisticsService} from "../../shared/services/statistics.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {actorStatisticsResult} from "../../shared/test/TestData";
import {of} from "rxjs";

describe('ActorStatisticsComponent', () => {
  let actorStatisticsComponent: ActorStatisticsComponent;
  let fixture: ComponentFixture<ActorStatisticsComponent>;

  const statisticsServiceSpy = TestUtilities.createStatisticsServiceSpy();
  const liveAnnouncerSpy = TestUtilities.createLiveAnnouncerSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorStatisticsComponent ],
      providers: [
        {provide: StatisticsService, useValue: statisticsServiceSpy},
        {provide: LiveAnnouncer, useValue: liveAnnouncerSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorStatisticsComponent);
    actorStatisticsComponent = fixture.componentInstance;
    statisticsServiceSpy.getActors.and.returnValue(of(actorStatisticsResult))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(actorStatisticsComponent).toBeTruthy();
  });
});
