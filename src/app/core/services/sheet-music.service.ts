import { Injectable, signal } from '@angular/core';
import { SheetMusic } from '../models/sheet-music.model';
import { Category } from '../models/category.model';
import { MOCK_CATEGORIES, MOCK_SHEET_MUSIC } from '../mocks/mock-data';
import { delay, Observable, of } from 'rxjs';

export interface SheetFilter {
  query?: string;
  category?: string;
  artist?: string;
  instrument?: string;
  difficulty?: string;
  materialType?: string;
  isFavorite?: boolean;
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class SheetMusicService {
  
  getRecentSheets(): Observable<SheetMusic[]> {
    return of(MOCK_SHEET_MUSIC).pipe(delay(500));
  }

  getFavoriteSheets(): Observable<SheetMusic[]> {
    return of(MOCK_SHEET_MUSIC.filter(s => s.isFavorite)).pipe(delay(400));
  }

  getMostAccessedSheets(): Observable<SheetMusic[]> {
    return of(MOCK_SHEET_MUSIC.slice(0, 3)).pipe(delay(450));
  }

  getCategories(): Observable<Category[]> {
    return of(MOCK_CATEGORIES).pipe(delay(300));
  }

  getFiltersData(): Observable<{artists: string[], instruments: string[]}> {
    const artists = [...new Set(MOCK_SHEET_MUSIC.map(s => s.artist))];
    const instruments = [...new Set(MOCK_SHEET_MUSIC.map(s => s.instrument))];
    return of({ artists, instruments }).pipe(delay(200));
  }

  getSheets(filter: SheetFilter): Observable<PaginatedResult<SheetMusic>> {
    let results = [...MOCK_SHEET_MUSIC];

    if (filter.query) {
      const lowerQuery = filter.query.toLowerCase();
      results = results.filter(s => 
        s.title.toLowerCase().includes(lowerQuery) || 
        s.artist.toLowerCase().includes(lowerQuery)
      );
    }

    if (filter.category) {
      results = results.filter(s => s.category === filter.category);
    }

    if (filter.artist) {
      results = results.filter(s => s.artist === filter.artist);
    }

    if (filter.instrument) {
      results = results.filter(s => s.instrument === filter.instrument);
    }

    if (filter.difficulty) {
      results = results.filter(s => s.difficulty === filter.difficulty);
    }

    if (filter.materialType) {
      results = results.filter(s => s.materialTypes.includes(filter.materialType as any));
    }

    if (filter.isFavorite !== undefined) {
      results = results.filter(s => s.isFavorite === filter.isFavorite);
    }

    const total = results.length;
    const totalPages = Math.ceil(total / filter.pageSize);
    const start = (filter.page - 1) * filter.pageSize;
    const paginatedData = results.slice(start, start + filter.pageSize);

    return of({
      data: paginatedData,
      total,
      page: filter.page,
      pageSize: filter.pageSize,
      totalPages
    }).pipe(delay(600));
  }

  searchSheets(query: string): Observable<SheetMusic[]> {
    const lowerQuery = query.toLowerCase();
    const results = MOCK_SHEET_MUSIC.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) || 
      s.artist.toLowerCase().includes(lowerQuery)
    );
    return of(results).pipe(delay(600));
  }

  getSheetById(id: string): Observable<SheetMusic | undefined> {
    const sheet = MOCK_SHEET_MUSIC.find(s => s.id === id);
    return of(sheet).pipe(delay(400));
  }
}
