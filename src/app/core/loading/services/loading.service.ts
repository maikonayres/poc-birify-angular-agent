import { inject, Injectable } from '@angular/core';
import { LoadingStore } from '../store/loading.store';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _loadingStore = inject(LoadingStore);
  public readonly isGlobalLoading = this._loadingStore.isGlobalLoading;
  public readonly isLoading = this.isGlobalLoading;

  public show(): void {
    this._loadingStore.incrementGlobal();
  }

  public hide(): void {
    this._loadingStore.decrementGlobal();
  }

  public showLocal(scope: string): void {
    this._loadingStore.incrementLocal(scope);
  }

  public hideLocal(scope: string): void {
    this._loadingStore.decrementLocal(scope);
  }

  public isScopeLoading(scope: string): boolean {
    return (this._loadingStore.localPendingRequestsByScope()[scope] ?? 0) > 0;
  }

  public reset(): void {
    this._loadingStore.reset();
  }
}
