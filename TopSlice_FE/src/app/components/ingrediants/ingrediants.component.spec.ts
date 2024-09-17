import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngrediantsComponent } from './ingrediants.component';

describe('IngrediantsComponent', () => {
  let component: IngrediantsComponent;
  let fixture: ComponentFixture<IngrediantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngrediantsComponent]
    });
    fixture = TestBed.createComponent(IngrediantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
