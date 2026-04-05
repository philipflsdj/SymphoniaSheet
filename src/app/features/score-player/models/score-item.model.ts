export interface ScoreItem {
  id: string;
  title: string;
  artist: string;
  instrument: string;
  fileUrl: string;
  coverUrl?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
