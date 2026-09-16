import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Alerta, AlertaRequest } from '../models/alerta.model';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/alerta`;

  listar(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.url);
  }

  criar(alerta: AlertaRequest): Observable<string> {
    return this.http.post(this.url, alerta, { responseType: 'text' });
  }

  atualizar(id: string, alerta: AlertaRequest): Observable<Alerta> {
    return this.http.put<Alerta>(`${this.url}/${id}`, alerta);
  }

  excluir(id: string): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}