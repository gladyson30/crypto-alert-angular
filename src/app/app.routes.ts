import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AlertaListComponent } from './pages/alerta-list/alerta-list.component';
import { AlertaFormComponent } from './pages/alerta-form/alerta-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'alertas', component: AlertaListComponent, canActivate: [authGuard] },
  { path: 'alertas/novo', component: AlertaFormComponent, canActivate: [authGuard] },
  { path: 'alertas/:id/editar', component: AlertaFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'alertas', pathMatch: 'full' },
  { path: '**', redirectTo: 'alertas' }
];