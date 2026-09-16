export type Direcao = 'ACIMA' | 'ABAIXO';

export interface Alerta {
  id: string;
  usuarioId: string;
  moeda: string;
  precoAlvo: number;
  direcao: Direcao;
}

export interface AlertaRequest {
  moeda: string;
  precoAlvo: number;
  direcao: Direcao;
}