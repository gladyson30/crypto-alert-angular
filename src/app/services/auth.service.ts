import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CadastroRequest, LoginRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'token';

  login(dados: LoginRequest): Observable<string> {
    return this.http
      .post(`${environment.apiUrl}/usuarios/login`, dados, { responseType: 'text' })
      .pipe(tap(token => localStorage.setItem(this.TOKEN_KEY, token)));
  }

  cadastrar(dados: CadastroRequest): Observable<string> {
    return this.http.post(`${environment.apiUrl}/usuarios`, dados, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  estaLogado(): boolean {
    return !!this.getToken();
  }
}