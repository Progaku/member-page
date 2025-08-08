import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {
  title = input.required<string>()
}
