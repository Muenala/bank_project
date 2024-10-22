import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { VALIDATION_MESSAGES } from '../../../features/product/constants/validation-messages';

@Component({
  selector: 'app-bp-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bp-input.component.html',
  styleUrl: './bp-input.component.scss'
})
export class BpInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @ContentChild('bp-label') labelRef!: ElementRef;

  value: string = '';
  isTouched: boolean = false;
  date = new Date()
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  get minDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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
      const errorKey = Object.keys(errors)[0] as keyof typeof VALIDATION_MESSAGES;
      if (VALIDATION_MESSAGES[errorKey]) {
        let message = VALIDATION_MESSAGES[errorKey];
        
        if (typeof errors[errorKey] === 'object') {
          const params = errors[errorKey] as Record<string, string>;
          Object.keys(params).forEach(key => {
            message = message.replace(`{${key}}`, params[key]);
          });
        }
        
        return message;
      }
    }
    return '';
  }
}