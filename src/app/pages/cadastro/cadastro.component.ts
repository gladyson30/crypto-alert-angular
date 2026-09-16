import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: '../login/login.component.css'
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  cadastrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    this.authService.cadastrar(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login'], { queryParams: { cadastro: 'ok' } }),
      error: (e: HttpErrorResponse) => {
        if (e.status === 403) {
          this.erro.set('Este e-mail já possui cadastro.');
        } else if (e.status === 400) {
          this.erro.set('Dados inválidos. Confira os campos.');
        } else if (e.status === 0) {
          this.erro.set('Não foi possível conectar à API.');
        } else {
          this.erro.set(`Erro inesperado (${e.status}).`);
        }
        this.carregando.set(false);
      }
    });
  }
}