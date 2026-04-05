import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CategoryService } from './services/category.service';
import { Category, CategoryQueryParams } from './models/category.model';
import { UserRole } from '../../core/models/role.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 md:p-8">
      <div class="max-w-7xl mx-auto">
        
        <!-- Cabeçalho -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Categorias</h1>
            <p class="text-slate-500 mt-1">Navegue e gerencie as coleções de partituras e cifras.</p>
          </div>
          
          <!-- Botão Nova Categoria (Apenas Admin/Owner) -->
          @if (canManageCategories()) {
            <button (click)="openModal()" class="bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-md shadow-[#6C5CE7]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 w-full md:w-auto justify-center">
              <mat-icon class="text-xl">add</mat-icon> Nova Categoria
            </button>
          }
        </header>

        <!-- Barra de Busca -->
        <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 mb-8 flex items-center gap-3">
          <div class="pl-3 text-slate-400 flex items-center">
            <mat-icon>search</mat-icon>
          </div>
          <input 
            type="text" 
            [ngModel]="searchQuery()" 
            (ngModelChange)="onSearch($event)"
            placeholder="Buscar categoria por nome ou descrição..." 
            class="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 py-2 pr-4 font-medium"
          >
          @if (searchQuery()) {
            <button (click)="clearSearch()" class="pr-3 text-slate-400 hover:text-slate-600 transition-colors flex items-center">
              <mat-icon class="text-xl">close</mat-icon>
            </button>
          }
        </div>

        <!-- Estado de Carregamento -->
        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center py-20">
            <div class="w-12 h-12 border-4 border-[#6C5CE7]/20 border-t-[#6C5CE7] rounded-full animate-spin mb-4"></div>
            <p class="text-slate-500 font-medium">Carregando categorias...</p>
          </div>
        } 
        
        <!-- Estado Vazio (Nenhum resultado) -->
        @else if (categories().length === 0) {
          <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm p-12 text-center flex flex-col items-center justify-center">
            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
              <mat-icon class="text-4xl">folder_off</mat-icon>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Nenhuma categoria encontrada</h3>
            <p class="text-slate-500 max-w-md mx-auto mb-8">
              @if (searchQuery()) {
                Não encontramos resultados para a sua busca. Tente usar outros termos.
              } @else {
                Ainda não há categorias cadastradas no sistema.
              }
            </p>
            
            @if (searchQuery()) {
              <button (click)="clearSearch()" class="text-[#6C5CE7] font-bold hover:underline">Limpar busca</button>
            } @else if (canManageCategories()) {
              <button (click)="openModal()" class="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300">
                Criar primeira categoria
              </button>
            }
          </div>
        }

        <!-- Grid de Categorias -->
        @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (category of categories(); track category.id) {
              <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                
                <!-- Badge de Status (Ativo/Inativo) -->
                <div class="absolute top-6 right-6">
                  @if (category.status === 'active') {
                    <span class="bg-emerald-50 text-emerald-600 border border-emerald-200/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ativa
                    </span>
                  } @else {
                    <span class="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inativa
                    </span>
                  }
                </div>

                <!-- Ícone da Categoria -->
                <div [class]="'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ' + category.colorClass">
                  <mat-icon class="text-2xl">{{ category.icon }}</mat-icon>
                </div>

                <!-- Conteúdo -->
                <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{{ category.name }}</h3>
                <p class="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">{{ category.description }}</p>

                <!-- Rodapé do Card (Músicas e Ações) -->
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div class="flex items-center gap-1.5 text-slate-500">
                    <mat-icon class="text-[16px] w-4 h-4">library_music</mat-icon>
                    <span class="text-sm font-semibold">{{ category.songCount }} <span class="font-normal text-xs">músicas</span></span>
                  </div>

                  <!-- Menu de Ações (Visível no hover ou em telas menores) -->
                  <div class="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <!-- Botão Visualizar (Todos) -->
                    <a [routerLink]="['/sheets']" [queryParams]="{ category: category.name }" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors" title="Visualizar">
                      <mat-icon class="text-[18px] w-[18px] h-[18px]">visibility</mat-icon>
                    </a>
                    
                    <!-- Ações de Admin/Owner -->
                    @if (canManageCategories()) {
                      <button (click)="openModal(category)" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#6C5CE7]/10 text-slate-600 hover:text-[#6C5CE7] flex items-center justify-center transition-colors" title="Editar">
                        <mat-icon class="text-[18px] w-[18px] h-[18px]">edit</mat-icon>
                      </button>
                      <button (click)="toggleCategoryStatus(category.id)" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors" [title]="category.status === 'active' ? 'Desativar' : 'Ativar'">
                        <mat-icon class="text-[18px] w-[18px] h-[18px]">{{ category.status === 'active' ? 'block' : 'check_circle' }}</mat-icon>
                      </button>
                      <button (click)="deleteCategory(category.id)" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors" title="Excluir">
                        <mat-icon class="text-[18px] w-[18px] h-[18px]">delete</mat-icon>
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Paginação Mockada (Preparada para API) -->
          @if (totalPages() > 1) {
            <div class="mt-10 flex items-center justify-center gap-2">
              <button 
                [disabled]="currentPage() === 1"
                (click)="changePage(currentPage() - 1)"
                class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <mat-icon class="text-sm">chevron_left</mat-icon>
              </button>
              
              <div class="flex items-center gap-1">
                @for (page of [].constructor(totalPages()); track $index) {
                  <button 
                    (click)="changePage($index + 1)"
                    [class]="currentPage() === ($index + 1) ? 'w-10 h-10 rounded-xl bg-[#6C5CE7] text-white font-bold shadow-md shadow-[#6C5CE7]/20 flex items-center justify-center' : 'w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center transition-colors'">
                    {{ $index + 1 }}
                  </button>
                }
              </div>

              <button 
                [disabled]="currentPage() === totalPages()"
                (click)="changePage(currentPage() + 1)"
                class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <mat-icon class="text-sm">chevron_right</mat-icon>
              </button>
            </div>
          }
        }
      </div>
    </div>

    <!-- Modal Nova Categoria -->
    @if (isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-800">{{ editingCategoryId() ? 'Editar Categoria' : 'Nova Categoria' }}</h2>
            <button (click)="closeModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <mat-icon class="text-xl">close</mat-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto">
            <form [formGroup]="categoryForm" (ngSubmit)="onSubmitCategory()" class="flex flex-col gap-5">
              
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Nome da Categoria</label>
                <input 
                  type="text" 
                  formControlName="name"
                  placeholder="Ex: Louvor, Adoração..."
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-slate-700"
                >
                @if (categoryForm.get('name')?.touched && categoryForm.get('name')?.invalid) {
                  <span class="text-xs text-rose-500 mt-1">Nome é obrigatório</span>
                }
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Descrição</label>
                <textarea 
                  formControlName="description"
                  rows="3"
                  placeholder="Descreva o propósito desta categoria..."
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-slate-700 resize-none"
                ></textarea>
                @if (categoryForm.get('description')?.touched && categoryForm.get('description')?.invalid) {
                  <span class="text-xs text-rose-500 mt-1">Descrição é obrigatória</span>
                }
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1.5">Ícone (Material Icon)</label>
                  <input 
                    type="text" 
                    formControlName="icon"
                    placeholder="Ex: music_note"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-slate-700"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1.5">Cor (Tailwind Class)</label>
                  <input 
                    type="text" 
                    formControlName="colorClass"
                    placeholder="Ex: bg-indigo-100 text-indigo-600"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 outline-none transition-all text-slate-700"
                  >
                </div>
              </div>

            </form>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
            <button 
              type="button" 
              (click)="closeModal()"
              class="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="button"
              (click)="onSubmitCategory()"
              [disabled]="categoryForm.invalid || isSaving()"
              class="px-5 py-2.5 rounded-xl font-bold text-white bg-[#6C5CE7] hover:bg-[#5a4bcf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-[#6C5CE7]/20 flex items-center gap-2"
            >
              @if (isSaving()) {
                <mat-icon class="animate-spin text-sm">refresh</mat-icon> Salvando...
              } @else {
                Salvar Categoria
              }
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  // Sinais de Estado (Signals)
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  searchQuery = signal<string>('');
  
  // Paginação
  currentPage = signal<number>(1);
  pageSize = signal<number>(8); // 8 itens por página para o grid
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  // Simulação de Controle de Acesso (Role do usuário logado)
  // Em um cenário real, isso viria de um AuthService/State
  currentUserRole = signal<UserRole>(UserRole.ADMIN);

  // Modal State
  isModalOpen = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  editingCategoryId = signal<string | null>(null);

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    icon: ['music_note'],
    colorClass: ['bg-indigo-100 text-indigo-600']
  });

  // Computed signal para verificar permissão
  canManageCategories = computed(() => {
    const role = this.currentUserRole();
    return role === UserRole.ADMIN || role === UserRole.OWNER;
  });

  ngOnInit(): void {
    this.fetchCategories();
  }

  /**
   * Busca as categorias na API (Mock)
   */
  fetchCategories(): void {
    this.isLoading.set(true);
    
    const params: CategoryQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchQuery()
    };

    this.categoryService.getCategories(params).subscribe({
      next: (response) => {
        this.categories.set(response.items);
        this.totalItems.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar categorias', err);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Acionado ao digitar na busca
   */
  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reseta para a primeira página ao buscar
    this.fetchCategories();
  }

  /**
   * Limpa o campo de busca
   */
  clearSearch(): void {
    this.searchQuery.set('');
    this.currentPage.set(1);
    this.fetchCategories();
  }

  /**
   * Navegação da paginação
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.fetchCategories();
    }
  }

  /**
   * Ação de excluir (Apenas UI mockada)
   */
  deleteCategory(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        // Recarrega a lista após excluir
        this.fetchCategories();
      });
    }
  }

  /**
   * Ação de ativar/desativar
   */
  toggleCategoryStatus(id: string): void {
    this.categoryService.toggleStatus(id).subscribe(() => {
      // Recarrega a lista para refletir a mudança
      this.fetchCategories();
    });
  }

  /**
   * Modal Actions
   */
  openModal(category?: Category): void {
    if (category) {
      this.editingCategoryId.set(category.id);
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
        icon: category.icon,
        colorClass: category.colorClass
      });
    } else {
      this.editingCategoryId.set(null);
      this.categoryForm.reset({
        icon: 'music_note',
        colorClass: 'bg-indigo-100 text-indigo-600'
      });
    }
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingCategoryId.set(null);
  }

  onSubmitCategory(): void {
    if (this.categoryForm.valid) {
      this.isSaving.set(true);
      
      const formValue = this.categoryForm.value;
      const categoryData = {
        name: formValue.name || '',
        description: formValue.description || '',
        icon: formValue.icon || '',
        colorClass: formValue.colorClass || ''
      };

      const editId = this.editingCategoryId();

      if (editId) {
        this.categoryService.updateCategory(editId, categoryData).subscribe({
          next: () => {
            this.isSaving.set(false);
            this.closeModal();
            this.fetchCategories(); // Recarrega a lista
          },
          error: (err) => {
            console.error('Erro ao atualizar categoria', err);
            this.isSaving.set(false);
          }
        });
      } else {
        this.categoryService.createCategory(categoryData).subscribe({
          next: () => {
            this.isSaving.set(false);
            this.closeModal();
            this.fetchCategories(); // Recarrega a lista
          },
          error: (err) => {
            console.error('Erro ao criar categoria', err);
            this.isSaving.set(false);
          }
        });
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
