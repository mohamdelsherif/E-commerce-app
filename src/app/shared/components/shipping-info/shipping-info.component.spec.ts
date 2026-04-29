import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInfoComponent } from './shipping-info.component';

describe('ShippingInfoComponent', () => {
  let component: ShippingInfoComponent;
  let fixture: ComponentFixture<ShippingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
