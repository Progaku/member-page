import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  standalone: true,
  templateUrl: './form-label.component.html',
  styleUrl: './form-label.component.scss',
})
export class FormLabelComponent {
  for = input.required<string>();
}
