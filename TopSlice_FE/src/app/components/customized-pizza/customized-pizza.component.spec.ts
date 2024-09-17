import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedPizzaComponent } from './customized-pizza.component';

describe('CustomizedPizzaComponent', () => {
  let component: CustomizedPizzaComponent;
  let fixture: ComponentFixture<CustomizedPizzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizedPizzaComponent]
    });
    fixture = TestBed.createComponent(CustomizedPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
