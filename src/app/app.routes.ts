import { Routes } from '@angular/router';
import { MainComponent } from './core/layouts/main/main.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
      { path: 'contacts', loadChildren: () => import('./pages/contacts/contacts.routes').then(m => m.CONTACTS_ROUTES) },      
    ],
    canActivate: [authGuard]
  },
  { path: 'auth', loadComponent: () => import('./core/auth/components/auth/auth.component').then(m => m.AuthComponent) }

];
