import { Component, Input } from '@angular/core';
import { DropdownAction } from '../../models/dropdownAction.model';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() activeDropdown: boolean = false;
  @Input() identify: string = "0";
  @Input() idProduct: string = "0";
  @Input() listActions: DropdownAction[] = []
  toggleDropdown(): void {
    this.activeDropdown = this.identify==this.idProduct? !this.activeDropdown: true;
  }
}
