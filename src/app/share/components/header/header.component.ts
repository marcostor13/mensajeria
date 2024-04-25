import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SESSION } from '../../constants/session.constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = false;

  constructor(
    private router: Router
  ){}

  logout(){
    localStorage.removeItem(SESSION.localStorage)
    this.router.navigate(['/'])    
  }
}
