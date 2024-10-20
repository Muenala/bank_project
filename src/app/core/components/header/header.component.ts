import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconSVGComponent } from "../../../shared/components/icon-svg/icon-svg.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconSVGComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {

}
