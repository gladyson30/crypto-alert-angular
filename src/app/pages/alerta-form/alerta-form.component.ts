import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AlertaRequest, Direcao } from '../../models/alerta.model';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-alerta-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './alerta-form.component.html',
  styleUrl: './alerta-form.component.css'
})
export class AlertaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private alertaService = inject(AlertaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: string | null = null;
  salvando = signal(false);
  erro = signal('');

  form = this.fb.nonNullable.group({
    moeda: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    precoAlvo: [0, [Validators.required, Validators.min(0.00000001)]],
    direcao: ['ACIMA' as Direcao, Validators.required]
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.carregarAlerta(this.id);
    }
  }

  get editando(): boolean {
    return this.id !== null;
  }

  private carregarAlerta(id: string): void {
    this.alertaService.listar()
      .pipe(map(lista => lista.find(a => a.id === id)))
      .subscribe({
        next: alerta => {
          if (!alerta) {
            this.router.navigate(['/alertas']);
            return;
          }
          this.form.patchValue({
            moeda: alerta.moeda,
            precoAlvo: alerta.precoAlvo,
            direcao: alerta.direcao
          });
        },
        error: () => this.erro.set('Não foi possível carregar o alerta.')
      });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    this.erro.set('');

    const dados: AlertaRequest = this.form.getRawValue();

    const requisicao: Observable<unknown> = this.id
      ? this.alertaService.atualizar(this.id, dados)
      : this.alertaService.criar(dados);

    requisicao.subscribe({
      next: () => this.router.navigate(['/alertas']),
      error: () => {
        this.erro.set('Não foi possível salvar o alerta.');
        this.salvando.set(false);
      }
    });
  }
}