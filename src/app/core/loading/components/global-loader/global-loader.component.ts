import { ChangeDetectorRef, Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
  imports: [ProgressSpinner],
})
export class GlobalLoaderComponent implements OnDestroy {
  protected readonly visible = signal(false);
  private readonly _loadingService = inject(LoadingService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _showDelayMs = 150;
  private _showTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const isLoading = this._loadingService.isLoading();

      if (isLoading) {
        if (this._showTimer || this.visible()) {
          return;
        }

        this._showTimer = setTimeout(() => {
          this.visible.set(true);
          this._cdr.markForCheck();
          this._showTimer = null;
        }, this._showDelayMs);
        return;
      }

      if (this._showTimer) {
        clearTimeout(this._showTimer);
        this._showTimer = null;
      }

      this.visible.set(false);
    });
  }

  public ngOnDestroy(): void {
    if (this._showTimer) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
  }
}
