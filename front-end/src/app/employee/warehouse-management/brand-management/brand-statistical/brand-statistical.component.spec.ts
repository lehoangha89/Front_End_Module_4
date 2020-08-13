import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStatisticalComponent } from './brand-statistical.component';

describe('BrandStatisticalComponent', () => {
  let component: BrandStatisticalComponent;
  let fixture: ComponentFixture<BrandStatisticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandStatisticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
