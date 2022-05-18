import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorStatisticsComponent } from './actorStatistics.component';

describe('ActorStatisticsComponent', () => {
  let component: ActorStatisticsComponent;
  let fixture: ComponentFixture<ActorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
