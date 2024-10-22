import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpInputComponent } from './bp-input.component';

describe('BpInputComponent', () => {
  let component: BpInputComponent;
  let fixture: ComponentFixture<BpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
