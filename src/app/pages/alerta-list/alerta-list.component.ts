import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alerta } from '../../models/alerta.model';
import { AlertaService } from '../../services/alerta.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alerta-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './alerta-list.component.html',
  styleUrl: './alerta-list.component.css'
})
export class AlertaListComponent implements OnInit {
  private alertaService = inject(AlertaService);
  private authService = inject(AuthService);

  alertas = signal<Alerta[]>([]);
  carregando = signal(true);
  erro = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.alertaService.listar().subscribe({
      next: lista => {
        this.alertas.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os alertas.');
        this.carregando.set(false);
      }
    });
  }

  excluir(alerta: Alerta): void {
    if (!confirm(`Excluir o alerta de ${alerta.moeda}?`)) return;

    this.alertaService.excluir(alerta.id).subscribe({
      next: () => this.alertas.update(lista => lista.filter(a => a.id !== alerta.id)),
      error: () => this.erro.set('Não foi possível excluir o alerta.')
    });
  }

  sair(): void {
    this.authService.logout();
  }
}