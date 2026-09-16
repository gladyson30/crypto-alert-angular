import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cotacao } from '../models/cotacao.model';

@Injectable({ providedIn: 'root' })
export class CotacaoService {
  private http = inject(HttpClient);

  buscar(moeda: string): Observable<Cotacao> {
    return this.http.get<Cotacao>(`${environment.apiUrl}/cripto/${encodeURIComponent(moeda)}`);
  }
}