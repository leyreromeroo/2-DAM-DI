import { Component, Input } from '@angular/core';
import { ConfiguracionModel } from '../../../models/configuracion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
@Input() config!: ConfiguracionModel;
}
