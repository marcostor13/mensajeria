import { Routes } from '@angular/router';
import { MainComponent } from './core/layouts/main/main.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: '',
    component: MainComponent,
    children: [     
      { path: 'contactos', loadComponent: () => import('./pages/contacts/contacts.component') },
      { path: 'listas', loadComponent: () => import('./pages/list/list.component') },
      { path: 'mensaje-simple', loadComponent: () => import('./pages/simple-message/simple-message.component') }      
    ],
    canActivate: [authGuard]
  },
  { path: 'auth', loadComponent: () => import('./core/auth/components/auth/auth.component').then(m => m.AuthComponent) }

];
