import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuComponent } from '../../../share/components/menu/menu.component';
import { HeaderComponent } from '../../../share/components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule, 
    RouterModule,
    NzButtonModule,
    MenuComponent,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent { 
  
}
