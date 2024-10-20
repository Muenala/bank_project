import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-svg',
  standalone: true,
  imports: [],
  templateUrl: './icon-svg.component.html',
  styleUrl: './icon-svg.component.scss'
})
export class IconSVGComponent {
  @Input() href!: string;
  @Input() width!: number;
  @Input() height!: number;
}
