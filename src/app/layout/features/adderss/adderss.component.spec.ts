import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdderssComponent } from './adderss.component';

describe('AdderssComponent', () => {
  let component: AdderssComponent;
  let fixture: ComponentFixture<AdderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdderssComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdderssComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
