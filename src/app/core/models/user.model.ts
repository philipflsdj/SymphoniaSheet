import { UserRole } from './role.model';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: 'free' | 'premium';
  avatarUrl?: string;
}
