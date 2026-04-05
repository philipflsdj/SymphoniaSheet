import { Category } from '../models/category.model';
import { SheetMusic } from '../models/sheet-music.model';
import { User } from '../models/user.model';
import { UserRole } from '../models/role.model';

export const MOCK_USER: User = {
  id: '1',
  name: 'João Músico',
  email: 'joao@symphonia.com',
  role: UserRole.FREE,
  plan: 'free',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao'
};

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Hinos', icon: 'book', count: 610 },
  { id: '2', name: 'Quartetos', icon: 'groups', count: 120 },
  { id: '3', name: 'Louvor Jovem', icon: 'music_note', count: 340 },
  { id: '4', name: 'Coral', icon: 'record_voice_over', count: 85 },
];

export const MOCK_SHEET_MUSIC: SheetMusic[] = [
  {
    id: '1',
    title: 'Castelo Forte',
    artist: 'Hinário Adventista',
    category: 'Hinos',
    type: 'sheet',
    materialTypes: ['sheet', 'pdf', 'musicxml'],
    difficulty: 'medium',
    instrument: 'Piano',
    isPremium: false,
    fileUrl: 'https://www.alphatab.net/files/canon.gp',
    thumbnailUrl: 'https://picsum.photos/seed/castelo/400/300',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Além do Rio',
    artist: 'Arautos do Rei',
    category: 'Quartetos',
    type: 'kit',
    materialTypes: ['kit', 'sheet', 'pdf'],
    difficulty: 'hard',
    instrument: 'Vozes (SATB)',
    isPremium: true,
    fileUrl: 'https://www.alphatab.net/files/canon.gp',
    thumbnailUrl: 'https://picsum.photos/seed/alem/400/300'
  },
  {
    id: '3',
    title: 'Brilhar por Ti',
    artist: 'Ministério Jovem',
    category: 'Louvor Jovem',
    type: 'chords',
    materialTypes: ['chords', 'pdf'],
    difficulty: 'easy',
    instrument: 'Violão',
    isPremium: false,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/brilhar/400/300',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Vaso de Alabastro',
    artist: 'Prisma Brasil',
    category: 'Coral',
    type: 'sheet',
    materialTypes: ['sheet', 'pdf', 'playback'],
    difficulty: 'medium',
    instrument: 'Coral (SCTB)',
    isPremium: true,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/vaso/400/300',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Fiel a Toda Prova',
    artist: 'Arautos do Rei',
    category: 'Quartetos',
    type: 'kit',
    materialTypes: ['kit', 'sheet', 'pdf', 'playback'],
    difficulty: 'hard',
    instrument: 'Vozes (TTBB)',
    isPremium: true,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/fiel/400/300'
  },
  {
    id: '6',
    title: 'A Única Esperança',
    artist: 'Ministério Jovem',
    category: 'Louvor Jovem',
    type: 'sheet',
    materialTypes: ['sheet', 'chords', 'pdf'],
    difficulty: 'easy',
    instrument: 'Piano e Voz',
    isPremium: false,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/esperanca/400/300'
  },
  {
    id: '7',
    title: 'Oh, Dia Feliz',
    artist: 'Hinário Adventista',
    category: 'Hinos',
    type: 'sheet',
    materialTypes: ['sheet', 'pdf'],
    difficulty: 'easy',
    instrument: 'Órgão',
    isPremium: false,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/diafeliz/400/300'
  },
  {
    id: '8',
    title: 'Agnus Dei',
    artist: 'Michael W. Smith',
    category: 'Coral',
    type: 'sheet',
    materialTypes: ['sheet', 'pdf', 'musicxml', 'playback'],
    difficulty: 'hard',
    instrument: 'Orquestra e Coral',
    isPremium: true,
    fileUrl: '#',
    thumbnailUrl: 'https://picsum.photos/seed/agnus/400/300'
  }
];
