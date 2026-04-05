import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'OWNER' | 'ADMIN' | 'SUBSCRIBER' | 'FREE';
  plan: 'Free' | 'Premium';
  createdAt: Date;
  favoriteInstruments: string[];
  favoriteCategories: string[];
  settings: {
    darkMode: boolean;
    notifications: boolean;
    language: string;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatIconModule, NgClass],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);

  user: UserProfile = {
    id: 'usr_12345',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=João',
    role: 'ADMIN',
    plan: 'Premium',
    createdAt: new Date('2025-01-15T10:30:00Z'),
    favoriteInstruments: ['Violão', 'Piano'],
    favoriteCategories: ['Louvor', 'Adoração'],
    settings: {
      darkMode: false,
      notifications: true,
      language: 'pt-BR'
    }
  };

  profileForm!: FormGroup;
  preferencesForm!: FormGroup;
  isEditing = false;
  showDeleteModal = false;

  availableInstruments = ['Violão', 'Guitarra', 'Piano', 'Teclado', 'Baixo', 'Bateria', 'Vocal'];
  availableCategories = ['Louvor', 'Adoração', 'Hinos', 'Jovem', 'Infantil', 'Coral'];

  recentActivity = [
    { id: 1, title: 'Visualizou "Grandes Coisas"', description: 'Partitura • Cifra', date: new Date('2026-03-26T14:20:00Z'), icon: 'visibility' },
    { id: 2, title: 'Adicionou "Ousado Amor" aos favoritos', description: 'Ação', date: new Date('2026-03-25T09:15:00Z'), icon: 'favorite' },
    { id: 3, title: 'Acessou o repertório "Culto Jovem"', description: 'Repertório', date: new Date('2026-03-24T19:45:00Z'), icon: 'queue_music' },
  ];

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: !this.isEditing }, [Validators.required, Validators.minLength(3)]],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]]
    });

    this.preferencesForm = this.fb.group({
      favoriteInstruments: [{ value: this.user.favoriteInstruments, disabled: false }],
      favoriteCategories: [{ value: this.user.favoriteCategories, disabled: false }]
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      this.profileForm.get('name')?.enable();
    } else {
      this.profileForm.get('name')?.disable();
      // Reset to original values if cancelled
      this.profileForm.patchValue({
        name: this.user.name
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.getRawValue();
      this.user = {
        ...this.user,
        name: formValues.name
      };
      this.toggleEdit();
      console.log('Profile saved:', this.user);
    }
  }

  savePreferences() {
    if (this.preferencesForm.valid) {
      const formValues = this.preferencesForm.getRawValue();
      this.user = {
        ...this.user,
        favoriteInstruments: formValues.favoriteInstruments,
        favoriteCategories: formValues.favoriteCategories
      };
      this.preferencesForm.markAsPristine();
      console.log('Preferences saved:', this.user);
    }
  }

  toggleSetting(setting: 'darkMode' | 'notifications') {
    this.user.settings[setting] = !this.user.settings[setting];
    console.log(`Setting ${setting} changed to ${this.user.settings[setting]}`);
  }

  deleteAccount() {
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log('Account deletion confirmed');
    this.showDeleteModal = false;
    // Call auth service to delete account and redirect
  }
}
