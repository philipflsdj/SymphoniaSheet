export interface SheetMusic {
  id: string;
  title: string;
  artist: string;
  category: string;
  type: 'sheet' | 'chords' | 'kit' | 'playback' | 'musicxml' | 'pdf';
  materialTypes: ('sheet' | 'chords' | 'kit' | 'playback' | 'musicxml' | 'pdf')[];
  difficulty: 'easy' | 'medium' | 'hard';
  instrument: string;
  isPremium: boolean;
  fileUrl: string;
  thumbnailUrl: string;
  isFavorite?: boolean;
}
