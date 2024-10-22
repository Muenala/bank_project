import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-bp-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bp-input.component.html',
  styleUrl: './bp-input.component.scss'
})
export class BpInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @ContentChild('bp-label') labelRef!: ElementRef;

  value: string = '';
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.value = value;
  }

  onBlur(): void {
    this.isTouched = true;
    this.onTouched();
  }

  get isInvalid(): boolean {
    return this.ngControl?.invalid && (this.ngControl?.touched || this.isTouched) || false;
  }

  get errorMessage(): string {
    const errors = this.ngControl?.errors;
    if (errors) {
      if (errors['required']) return 'Este campo es requerido';
      if (errors['email']) return 'Ingrese un email válido';
    }
    return '';
  }
}