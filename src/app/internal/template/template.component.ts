import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@/internal/components/header/header.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {

}
