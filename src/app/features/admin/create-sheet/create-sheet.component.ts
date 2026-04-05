import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-sheet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 md:p-8 pb-24">
      <div class="max-w-7xl mx-auto">
        
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
              <a routerLink="/admin" class="hover:text-[#6C5CE7] transition-colors">Admin</a>
              <mat-icon class="text-[16px] w-4 h-4">chevron_right</mat-icon>
              <span>Partituras</span>
              <mat-icon class="text-[16px] w-4 h-4">chevron_right</mat-icon>
              <span class="text-slate-900">Nova</span>
            </div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Cadastrar Partitura</h1>
          </div>
          
          <div class="flex items-center gap-3 w-full md:w-auto">
            <button routerLink="/admin" class="flex-1 md:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-sm text-center">
              Cancelar
            </button>
            <button (click)="onSubmit('draft')" class="flex-1 md:flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
              <mat-icon class="text-[18px] w-[18px] h-[18px]">save</mat-icon> Rascunho
            </button>
            <button (click)="onSubmit('published')" class="flex-1 md:flex-none bg-[#6C5CE7] hover:bg-[#5a4bcf] text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-[#6C5CE7]/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <mat-icon class="text-[18px] w-[18px] h-[18px]">publish</mat-icon> Publicar
            </button>
          </div>
        </header>

        <form [formGroup]="sheetForm" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Coluna Esquerda (Principal) -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Card 1: Informações Principais -->
            <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
              <h2 class="text-xl font-extrabold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7] flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">info</mat-icon>
                </div>
                Informações Principais
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Título -->
                <div class="md:col-span-2">
                  <label for="title" class="block text-sm font-bold text-slate-700 mb-2">Título da Música *</label>
                  <input type="text" id="title" formControlName="title" placeholder="Ex: Castelo Forte" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all"
                    [ngClass]="{'border-rose-300 focus:ring-rose-200 focus:border-rose-400': isInvalid('title')}">
                  @if (isInvalid('title')) { <p class="text-rose-500 text-xs font-medium mt-1">O título é obrigatório.</p> }
                </div>

                <!-- Subtítulo -->
                <div class="md:col-span-2">
                  <label for="subtitle" class="block text-sm font-bold text-slate-700 mb-2">Subtítulo <span class="text-slate-400 font-normal">(Opcional)</span></label>
                  <input type="text" id="subtitle" formControlName="subtitle" placeholder="Ex: Hino 33" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                </div>

                <!-- Artista -->
                <div>
                  <label for="artist" class="block text-sm font-bold text-slate-700 mb-2">Artista / Grupo *</label>
                  <div class="relative">
                    <select id="artist" formControlName="artist" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all" [ngClass]="{'border-rose-300': isInvalid('artist')}">
                      <option value="" disabled selected>Selecione um artista</option>
                      @for (artist of mockArtists; track artist) {
                        <option [value]="artist">{{ artist }}</option>
                      }
                    </select>
                    <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</mat-icon>
                  </div>
                  @if (isInvalid('artist')) { <p class="text-rose-500 text-xs font-medium mt-1">Selecione um artista.</p> }
                </div>

                <!-- Categoria -->
                <div>
                  <label for="category" class="block text-sm font-bold text-slate-700 mb-2">Categoria *</label>
                  <div class="relative">
                    <select id="category" formControlName="category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all" [ngClass]="{'border-rose-300': isInvalid('category')}">
                      <option value="" disabled selected>Selecione uma categoria</option>
                      @for (cat of mockCategories; track cat) {
                        <option [value]="cat">{{ cat }}</option>
                      }
                    </select>
                    <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</mat-icon>
                  </div>
                  @if (isInvalid('category')) { <p class="text-rose-500 text-xs font-medium mt-1">Selecione uma categoria.</p> }
                </div>

                <!-- Compositor -->
                <div>
                  <label for="composer" class="block text-sm font-bold text-slate-700 mb-2">Compositor</label>
                  <input type="text" id="composer" formControlName="composer" placeholder="Nome do compositor" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                </div>

                <!-- Arranjador -->
                <div>
                  <label for="arranger" class="block text-sm font-bold text-slate-700 mb-2">Arranjador</label>
                  <input type="text" id="arranger" formControlName="arranger" placeholder="Nome do arranjador" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                </div>

                <!-- Tonalidade -->
                <div>
                  <label for="key" class="block text-sm font-bold text-slate-700 mb-2">Tonalidade</label>
                  <div class="relative">
                    <select id="key" formControlName="key" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                      <option value="" disabled selected>Ex: C, G, Am</option>
                      <option value="C">C (Dó Maior)</option>
                      <option value="G">G (Sol Maior)</option>
                      <option value="D">D (Ré Maior)</option>
                      <option value="A">A (Lá Maior)</option>
                      <option value="E">E (Mi Maior)</option>
                      <option value="Am">Am (Lá Menor)</option>
                      <option value="Em">Em (Mi Menor)</option>
                    </select>
                    <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</mat-icon>
                  </div>
                </div>

                <!-- Andamento (BPM) -->
                <div>
                  <label for="tempo" class="block text-sm font-bold text-slate-700 mb-2">Andamento (BPM)</label>
                  <input type="text" id="tempo" formControlName="tempo" placeholder="Ex: 120" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all"
                    [ngClass]="{'border-rose-300': isInvalid('tempo')}">
                  @if (isInvalid('tempo')) { <p class="text-rose-500 text-xs font-medium mt-1">Apenas números.</p> }
                </div>

                <!-- Dificuldade -->
                <div>
                  <label for="difficulty" class="block text-sm font-bold text-slate-700 mb-2">Dificuldade</label>
                  <div class="relative">
                    <select id="difficulty" formControlName="difficulty" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                      <option value="Fácil">Fácil</option>
                      <option value="Médio">Médio</option>
                      <option value="Difícil">Difícil</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                    <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</mat-icon>
                  </div>
                </div>

                <!-- Idioma -->
                <div>
                  <label for="language" class="block text-sm font-bold text-slate-700 mb-2">Idioma</label>
                  <div class="relative">
                    <select id="language" formControlName="language" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all">
                      <option value="PT-BR">Português (BR)</option>
                      <option value="EN">Inglês</option>
                      <option value="ES">Espanhol</option>
                      <option value="Instrumental">Instrumental (Sem letra)</option>
                    </select>
                    <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</mat-icon>
                  </div>
                </div>

                <!-- Descrição -->
                <div class="md:col-span-2">
                  <label for="description" class="block text-sm font-bold text-slate-700 mb-2">Descrição / Observações</label>
                  <textarea id="description" formControlName="description" rows="3" placeholder="Detalhes adicionais sobre o arranjo..." 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Card 2: Tipos de Material -->
            <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-sm" [ngClass]="{'border-rose-300': isInvalid('materials')}">
              <h2 class="text-xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-[#0984E3]/10 text-[#0984E3] flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">library_music</mat-icon>
                </div>
                Tipos de Material *
              </h2>
              <p class="text-sm text-slate-500 mb-6">Selecione os formatos disponíveis para esta música.</p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                @for (mat of mockMaterials; track mat) {
                  <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                         [ngClass]="{'bg-[#6C5CE7]/5 border-[#6C5CE7]/30': isSelected('materials', mat)}">
                    <input type="checkbox" class="w-5 h-5 rounded border-slate-300 text-[#6C5CE7] focus:ring-[#6C5CE7]"
                           [checked]="isSelected('materials', mat)"
                           (change)="toggleSelection('materials', mat)">
                    <span class="text-sm font-bold text-slate-700">{{ mat }}</span>
                  </label>
                }
              </div>
              @if (isInvalid('materials')) { <p class="text-rose-500 text-xs font-medium mt-3">Selecione pelo menos um tipo de material.</p> }
            </div>

            <!-- Card 3: Instrumentos -->
            <div class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-sm" [ngClass]="{'border-rose-300': isInvalid('instruments')}">
              <h2 class="text-xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">piano</mat-icon>
                </div>
                Instrumentos & Vozes *
              </h2>
              <p class="text-sm text-slate-500 mb-6">Quais instrumentos estão inclusos neste arranjo?</p>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                @for (inst of mockInstruments; track inst) {
                  <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                         [ngClass]="{'bg-emerald-50 border-emerald-200': isSelected('instruments', inst)}">
                    <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                           [checked]="isSelected('instruments', inst)"
                           (change)="toggleSelection('instruments', inst)">
                    <span class="text-sm font-bold text-slate-700">{{ inst }}</span>
                  </label>
                }
              </div>
              @if (isInvalid('instruments')) { <p class="text-rose-500 text-xs font-medium mt-3">Selecione pelo menos um instrumento.</p> }
            </div>

          </div>

          <!-- Coluna Direita (Uploads e Configs) -->
          <div class="space-y-8">
            
            <!-- Card 4: Uploads -->
            <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
              <h2 class="text-lg font-extrabold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">cloud_upload</mat-icon>
                </div>
                Arquivos
              </h2>

              <div class="space-y-5">
                <!-- Capa -->
                <div>
                  <label for="cover" class="block text-sm font-bold text-slate-700 mb-2">Capa / Thumbnail</label>
                  <div class="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-[#6C5CE7]/50 transition-colors cursor-pointer group">
                    <input type="file" id="cover" class="hidden">
                    <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3 group-hover:bg-[#6C5CE7]/10 group-hover:text-[#6C5CE7] transition-colors">
                      <mat-icon>image</mat-icon>
                    </div>
                    <p class="text-sm font-bold text-slate-700">Clique para enviar</p>
                    <p class="text-xs text-slate-500 mt-1">PNG, JPG (Máx 2MB)</p>
                  </div>
                </div>

                <!-- PDF -->
                <div>
                  <label for="pdf" class="block text-sm font-bold text-slate-700 mb-2">Arquivo PDF</label>
                  <div class="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                    <input type="file" id="pdf" class="hidden">
                    <div class="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                      <mat-icon>picture_as_pdf</mat-icon>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-bold text-slate-700">Selecionar PDF</p>
                      <p class="text-xs text-slate-500">Obrigatório para leitura</p>
                    </div>
                  </div>
                </div>

                <!-- MusicXML -->
                <div>
                  <label for="musicxml" class="block text-sm font-bold text-slate-700 mb-2">Arquivo MusicXML</label>
                  <div class="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                    <input type="file" id="musicxml" class="hidden">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <mat-icon>code</mat-icon>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-bold text-slate-700">Selecionar .mxl</p>
                      <p class="text-xs text-slate-500">Para o Player Interativo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 5: Configurações -->
            <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
              <h2 class="text-lg font-extrabold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-slate-900/5 text-slate-700 flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">settings</mat-icon>
                </div>
                Configurações
              </h2>

              <div class="space-y-4">
                <!-- Premium Toggle -->
                <label for="isPremium" class="flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <div>
                    <p class="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <mat-icon class="text-[16px] w-[16px] h-[16px] text-amber-500">star</mat-icon> Conteúdo Premium
                    </p>
                    <p class="text-xs text-slate-500 mt-0.5">Apenas assinantes podem baixar</p>
                  </div>
                  <div class="relative inline-block w-12 h-6 rounded-full transition-colors" [ngClass]="sheetForm.value.isPremium ? 'bg-[#6C5CE7]' : 'bg-slate-300'">
                    <input type="checkbox" id="isPremium" formControlName="isPremium" class="opacity-0 w-0 h-0">
                    <span class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform" [ngClass]="{'translate-x-6': sheetForm.value.isPremium}"></span>
                  </div>
                </label>

                <!-- Destaque Toggle -->
                <label for="isFeatured" class="flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <div>
                    <p class="text-sm font-bold text-slate-900">Em Destaque</p>
                    <p class="text-xs text-slate-500 mt-0.5">Aparecer na página inicial</p>
                  </div>
                  <div class="relative inline-block w-12 h-6 rounded-full transition-colors" [ngClass]="sheetForm.value.isFeatured ? 'bg-emerald-500' : 'bg-slate-300'">
                    <input type="checkbox" id="isFeatured" formControlName="isFeatured" class="opacity-0 w-0 h-0">
                    <span class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform" [ngClass]="{'translate-x-6': sheetForm.value.isFeatured}"></span>
                  </div>
                </label>

                <!-- Visibilidade Toggle -->
                <label for="isVisible" class="flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <div>
                    <p class="text-sm font-bold text-slate-900">Visível no Catálogo</p>
                    <p class="text-xs text-slate-500 mt-0.5">Ocultar se for material privado</p>
                  </div>
                  <div class="relative inline-block w-12 h-6 rounded-full transition-colors" [ngClass]="sheetForm.value.isVisible ? 'bg-[#0984E3]' : 'bg-slate-300'">
                    <input type="checkbox" id="isVisible" formControlName="isVisible" class="opacity-0 w-0 h-0">
                    <span class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform" [ngClass]="{'translate-x-6': sheetForm.value.isVisible}"></span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Card 6: Tags -->
            <div class="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
              <h2 class="text-lg font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">local_offer</mat-icon>
                </div>
                Tags
              </h2>

              <div class="mb-4">
                <input type="text" placeholder="Digite uma tag e aperte Enter..." 
                  (keydown.enter)="addTag($event)"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] outline-none transition-all text-sm">
              </div>

              <div class="flex flex-wrap gap-2">
                @for (tag of sheetForm.value.tags; track tag) {
                  <span class="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    {{ tag }}
                    <mat-icon (click)="removeTag(tag)" class="text-[14px] w-[14px] h-[14px] cursor-pointer hover:text-rose-500 transition-colors">close</mat-icon>
                  </span>
                }
                @if (sheetForm.value.tags?.length === 0) {
                  <p class="text-xs text-slate-400 italic">Nenhuma tag adicionada.</p>
                }
              </div>
              
              <div class="mt-6 pt-4 border-t border-slate-100">
                <p class="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Sugestões</p>
                <div class="flex flex-wrap gap-2">
                  @for (sug of mockTags; track sug) {
                    <button type="button" (click)="addSuggestedTag(sug)" class="text-xs font-medium text-[#6C5CE7] bg-[#6C5CE7]/10 hover:bg-[#6C5CE7]/20 px-2 py-1 rounded-md transition-colors">
                      + {{ sug }}
                    </button>
                  }
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  `
})
export class CreateSheetComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  sheetForm!: FormGroup;

  // Mocks
  mockCategories = ['Hinários', 'Jovem Adventista (JA)', 'Novo Tempo', 'Louvor', 'Adoração', 'Especial', 'Instrumental'];
  mockArtists = ['Arautos do Rei', 'Novo Tom', 'Coral Jovem do IASP', 'Rafaela Pinho', 'Leonardo Gonçalves', 'Prisma Brasil', 'Vocal Livre'];
  mockMaterials = ['Partitura', 'Cifra', 'Kit de Ensaio', 'Playback', 'MusicXML', 'PDF'];
  mockInstruments = ['Piano', 'Violão', 'Teclado', 'Soprano', 'Contralto', 'Tenor', 'Baixo', 'Bateria', 'Violino', 'Flauta', 'Orquestra'];
  mockTags = ['Culto Divino', 'Especial', 'Páscoa', 'Natal', 'Apelo', 'Desbravadores'];

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.sheetForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      artist: ['', Validators.required],
      category: ['', Validators.required],
      album: [''],
      composer: [''],
      arranger: [''],
      key: [''],
      tempo: ['', [Validators.pattern('^[0-9]*$')]],
      difficulty: ['Médio'],
      language: ['PT-BR'],
      description: [''],
      materials: new FormControl<string[]>([], [Validators.required, Validators.minLength(1)]),
      instruments: new FormControl<string[]>([], [Validators.required, Validators.minLength(1)]),
      tags: new FormControl<string[]>([]),
      isPremium: [false],
      status: ['draft'],
      isFeatured: [false],
      isVisible: [true]
    });
  }

  // Helpers para o template
  isInvalid(controlName: string): boolean {
    const control = this.sheetForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isSelected(arrayName: 'materials' | 'instruments', value: string): boolean {
    const currentValues = this.sheetForm.get(arrayName)?.value as string[] || [];
    return currentValues.includes(value);
  }

  toggleSelection(arrayName: 'materials' | 'instruments', value: string) {
    const currentValues = this.sheetForm.get(arrayName)?.value as string[] || [];
    const index = currentValues.indexOf(value);
    
    if (index === -1) {
      this.sheetForm.get(arrayName)?.setValue([...currentValues, value]);
    } else {
      this.sheetForm.get(arrayName)?.setValue(currentValues.filter(v => v !== value));
    }
    this.sheetForm.get(arrayName)?.markAsTouched();
  }

  // Tags
  addTag(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    
    if (value) {
      const currentTags = this.sheetForm.get('tags')?.value as string[] || [];
      if (!currentTags.includes(value)) {
        this.sheetForm.get('tags')?.setValue([...currentTags, value]);
      }
      input.value = '';
    }
  }

  addSuggestedTag(tag: string) {
    const currentTags = this.sheetForm.get('tags')?.value as string[] || [];
    if (!currentTags.includes(tag)) {
      this.sheetForm.get('tags')?.setValue([...currentTags, tag]);
    }
  }

  removeTag(tagToRemove: string) {
    const currentTags = this.sheetForm.get('tags')?.value as string[] || [];
    this.sheetForm.get('tags')?.setValue(currentTags.filter(t => t !== tagToRemove));
  }

  // Submit
  onSubmit(status: 'published' | 'draft') {
    this.sheetForm.get('status')?.setValue(status);
    
    if (this.sheetForm.invalid) {
      this.sheetForm.markAllAsTouched();
      // Em um app real, mostraríamos um toast de erro aqui
      console.error('Formulário inválido', this.sheetForm.errors);
      return;
    }

    // Sucesso (Mock)
    console.log('Dados salvos:', this.sheetForm.value);
    alert(`Partitura ${status === 'published' ? 'publicada' : 'salva como rascunho'} com sucesso!`);
    this.router.navigate(['/admin']);
  }
}
