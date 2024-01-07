import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  standalone: true,
  templateUrl: './form-label.component.html',
  styleUrl: './form-label.component.scss'
})
export class FormLabelComponent {
  @Input({ required: true }) for = '';
}
