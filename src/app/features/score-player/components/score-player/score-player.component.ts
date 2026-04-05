import { 
  Component, 
  ElementRef, 
  Input, 
  OnChanges, 
  OnDestroy, 
  AfterViewInit, 
  SimpleChanges, 
  ViewChild, 
  ViewEncapsulation,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as alphaTab from '@coderline/alphatab';

@Component({
  selector: 'app-score-player',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './score-player.component.html',
  styleUrls: ['./score-player.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScorePlayerComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input({ required: true }) fileUrl!: string;
  
  @ViewChild('alphaTabContainer', { static: true }) container!: ElementRef;
  @ViewChild('alphaTabWrapper', { static: true }) wrapper!: ElementRef;

  private api: alphaTab.AlphaTabApi | null = null;
  
  // State using Signals
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal('');
  isPlaying = signal(false);
  isReady = signal(false);
  zoom = signal(100);
  tempo = signal(100);
  
  tracks = signal<any[]>([]);
  selectedTrackIndex = signal(0);

  ngAfterViewInit() {
    this.initAlphaTab();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileUrl'] && !changes['fileUrl'].firstChange) {
      this.loadScore();
    }
  }

  ngOnDestroy() {
    this.destroyAlphaTab();
  }

  private destroyAlphaTab() {
    if (this.api) {
      this.api.destroy();
      this.api = null;
    }
  }

  private initAlphaTab() {
    this.destroyAlphaTab(); // Ensure clean state

    this.api = new alphaTab.AlphaTabApi(this.container.nativeElement, {
      core: {
        logLevel: 'info',
        engine: 'html5',
        fontDirectory: '/font/'
      },
      player: {
        enablePlayer: true,
        soundFont: '/soundfont/sonivox.sf2',
        scrollElement: this.wrapper.nativeElement
      },
      display: {
        layoutMode: alphaTab.LayoutMode.Page,
        staveProfile: alphaTab.StaveProfile.Score
      }
    });

    this.setupEvents();
    this.loadScore();
  }

  private setupEvents() {
    if (!this.api) return;

    this.api.scoreLoaded.on((score: any) => {
      this.tracks.set(score.tracks || []);
      this.isLoading.set(false);
      this.hasError.set(false);
      
      if (this.tracks().length > 0) {
        this.selectedTrackIndex.set(this.tracks()[0].index);
        this.api!.renderTracks([this.tracks()[0]]);
      }
    });

    this.api.soundFontLoaded.on(() => {
      this.isReady.set(true);
    });

    this.api.playerReady.on(() => {
      this.isReady.set(true);
    });

    this.api.playerStateChanged.on((args: any) => {
      this.isPlaying.set(args.state === alphaTab.synth.PlayerState.Playing);
    });

    this.api.error.on((e: any) => {
      console.error('AlphaTab Error:', e);
      this.handleError('Erro ao processar a partitura. O arquivo pode estar corrompido ou em um formato não suportado.');
    });
  }

  private loadScore() {
    if (!this.fileUrl || !this.api) return;
    
    this.isLoading.set(true);
    this.hasError.set(false);
    this.isReady.set(false);
    this.tracks.set([]);
    
    try {
      this.api.load(this.fileUrl);
    } catch (e) {
      console.error('Failed to load score:', e);
      this.handleError('Não foi possível carregar o arquivo da partitura. Verifique sua conexão.');
    }
  }

  private handleError(message: string) {
    this.hasError.set(true);
    this.errorMessage.set(message);
    this.isLoading.set(false);
  }

  playPause() {
    if (!this.isReady() || !this.api) return;
    this.api.playPause();
  }

  stop() {
    if (!this.isReady() || !this.api) return;
    this.api.stop();
  }

  setZoom(newZoom: number) {
    if (newZoom >= 50 && newZoom <= 200 && this.api) {
      this.zoom.set(newZoom);
      this.api.settings.display.scale = newZoom / 100;
      this.api.updateSettings();
      this.api.render();
    }
  }

  setTempo(newTempo: number) {
    if (newTempo >= 50 && newTempo <= 200 && this.api) {
      this.tempo.set(newTempo);
      this.api.playbackSpeed = newTempo / 100;
    }
  }

  onTrackChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const trackIndex = parseInt(select.value, 10);
    const track = this.tracks().find(t => t.index === trackIndex);
    if (track && this.api) {
      this.selectedTrackIndex.set(trackIndex);
      this.api.renderTracks([track]);
    }
  }

  retry() {
    this.loadScore();
  }
}
