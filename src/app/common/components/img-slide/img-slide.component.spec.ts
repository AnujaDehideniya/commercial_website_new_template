import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlideComponent } from './img-slide.component';

describe('ImgSlideComponent', () => {
  let component: ImgSlideComponent;
  let fixture: ComponentFixture<ImgSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgSlideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
