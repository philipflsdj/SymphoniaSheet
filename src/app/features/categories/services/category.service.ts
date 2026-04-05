import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Category, CategoryQueryParams, PaginatedResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Dados Mockados para simular o banco de dados
  private mockCategories: Category[] = [
    {
      id: '1',
      name: 'Hinários',
      description: 'Coletânea oficial de hinos tradicionais e litúrgicos para cultos.',
      songCount: 610,
      status: 'active',
      icon: 'menu_book',
      colorClass: 'bg-amber-100 text-amber-600'
    },
    {
      id: '2',
      name: 'Jovem Adventista (JA)',
      description: 'Músicas vibrantes e contemporâneas para os cultos jovens.',
      songCount: 125,
      status: 'active',
      icon: 'music_note',
      colorClass: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: '3',
      name: 'Novo Tempo',
      description: 'Repertório oficial da gravadora Novo Tempo com arranjos originais.',
      songCount: 340,
      status: 'active',
      icon: 'album',
      colorClass: 'bg-blue-100 text-blue-600'
    },
    {
      id: '4',
      name: 'Louvor',
      description: 'Cânticos congregacionais para momentos de louvor e gratidão.',
      songCount: 890,
      status: 'active',
      icon: 'volunteer_activism',
      colorClass: 'bg-rose-100 text-rose-600'
    },
    {
      id: '5',
      name: 'Adoração',
      description: 'Músicas profundas e reflexivas para momentos de consagração.',
      songCount: 450,
      status: 'active',
      icon: 'self_improvement',
      colorClass: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: '6',
      name: 'Especial',
      description: 'Arranjos elaborados para corais, quartetos e grupos vocais.',
      songCount: 210,
      status: 'active',
      icon: 'groups',
      colorClass: 'bg-purple-100 text-purple-600'
    },
    {
      id: '7',
      name: 'Instrumental',
      description: 'Partituras exclusivas para piano, violino, orquestra e banda.',
      songCount: 185,
      status: 'inactive',
      icon: 'piano',
      colorClass: 'bg-slate-100 text-slate-600'
    }
  ];

  constructor() {}

  /**
   * Simula uma chamada GET para a API .NET com paginação e filtro
   */
  getCategories(params: CategoryQueryParams): Observable<PaginatedResponse<Category>> {
    let filtered = [...this.mockCategories];

    // Simula filtro de busca no backend
    if (params.search) {
      const term = params.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.description.toLowerCase().includes(term)
      );
    }

    // Simula filtro de status
    if (params.status) {
      filtered = filtered.filter(c => c.status === params.status);
    }

    // Simula paginação
    const startIndex = (params.page - 1) * params.pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + params.pageSize);

    const response: PaginatedResponse<Category> = {
      items: paginatedItems,
      totalCount: filtered.length,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(filtered.length / params.pageSize)
    };

    // Retorna com um delay para simular latência de rede
    return of(response).pipe(delay(600));
  }

  /**
   * Simula a exclusão de uma categoria
   */
  deleteCategory(id: string): Observable<boolean> {
    this.mockCategories = this.mockCategories.filter(c => c.id !== id);
    return of(true).pipe(delay(400));
  }

  /**
   * Simula a criação de uma nova categoria
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    const newCategory: Category = {
      id: Math.random().toString(36).substring(2, 9),
      name: category.name || '',
      description: category.description || '',
      songCount: 0,
      status: 'active',
      icon: category.icon || 'music_note',
      colorClass: category.colorClass || 'bg-indigo-100 text-indigo-600'
    };
    
    this.mockCategories.unshift(newCategory);
    return of(newCategory).pipe(delay(400));
  }

  /**
   * Simula a atualização de uma categoria
   */
  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    const index = this.mockCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCategories[index] = { ...this.mockCategories[index], ...category };
      return of(this.mockCategories[index]).pipe(delay(400));
    }
    throw new Error('Categoria não encontrada');
  }

  /**
   * Simula a alteração de status (Ativar/Desativar)
   */
  toggleStatus(id: string): Observable<Category> {
    const category = this.mockCategories.find(c => c.id === id);
    if (category) {
      category.status = category.status === 'active' ? 'inactive' : 'active';
      return of({ ...category }).pipe(delay(400));
    }
    throw new Error('Categoria não encontrada');
  }
}
