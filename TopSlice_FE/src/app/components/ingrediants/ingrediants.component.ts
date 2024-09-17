import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ingrediants',
  templateUrl: './ingrediants.component.html',
  styleUrls: ['./ingrediants.component.css']
})
export class IngrediantsComponent {

  @Input() ingredients: string[] = [];
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

}
