import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamcardsComponent } from './teamcards.component';

describe('TeamcardsComponent', () => {
  let component: TeamcardsComponent;
  let fixture: ComponentFixture<TeamcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
