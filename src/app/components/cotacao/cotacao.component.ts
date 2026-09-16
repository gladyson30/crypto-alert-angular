import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cotacao } from '../../models/cotacao.model';
import { CotacaoService } from '../../services/cotacao.service';

@Component({
  selector: 'app-cotacao',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css'
})
export class CotacaoComponent {
  private cotacaoService = inject(CotacaoService);

  moeda = 'bitcoin';
  moedaConsultada = signal('');
  cotacao = signal<Cotacao | null>(null);
  carregando = signal(false);
  erro = signal('');

  buscar(): void {
    const moeda = this.moeda.trim().toLowerCase();
    if (!moeda) return;

    this.carregando.set(true);
    this.erro.set('');
    this.cotacao.set(null);

    this.cotacaoService.buscar(moeda).subscribe({
      next: resultado => {
        this.cotacao.set(resultado);
        this.moedaConsultada.set(moeda);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Moeda não encontrada. Use o id da CoinGecko, ex.: bitcoin.');
        this.carregando.set(false);
      }
    });
  }
}