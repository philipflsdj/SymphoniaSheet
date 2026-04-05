export interface Category {
  id: string;
  name: string;
  description: string;
  songCount: number;
  status: 'active' | 'inactive';
  icon: string;
  colorClass: string; // Classe utilitária do Tailwind para a cor do ícone/fundo
}

// Parâmetros de paginação e filtro para futura integração com API .NET
export interface CategoryQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: 'active' | 'inactive';
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
