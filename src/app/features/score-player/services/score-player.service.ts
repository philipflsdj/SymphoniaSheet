import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ScoreItem } from '../models/score-item.model';

@Injectable({
  providedIn: 'root'
})
export class ScorePlayerService {
  
  // Exemplo mockado de partitura
  private mockScore: ScoreItem = {
    id: '1',
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    instrument: 'Guitarra',
    // Arquivo de exemplo público do AlphaTab
    fileUrl: 'https://www.alphatab.net/files/canon.gp',
    coverUrl: 'https://picsum.photos/seed/canon/400/400',
    difficulty: 'medium'
  };

  /**
   * Simula a busca dos dados da partitura em uma API.
   * No futuro, isso pode ser substituído por um this.http.get<ScoreItem>(...)
   */
  getScoreDetails(id: string): Observable<ScoreItem> {
    // Simulando delay de rede
    return of(this.mockScore).pipe(delay(800));
  }
}
