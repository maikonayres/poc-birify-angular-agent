import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';

import { AuthFacade } from '../../facades/auth.facade';
import { LoginI18nVmService } from '../../services/login-i18n-vm.service';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AppearanceThemeToggle } from '../../../../../core/appearance/components/appearance-theme-toggle/appearance-theme-toggle.component';
import { AppearanceConfiguratorTrigger } from '../../../../../core/appearance/components/appearance-configurator-trigger/appearance-configurator-trigger.component';
import { LanguageSelectorTrigger } from '../../../../../core/i18n/components/language-selector-trigger/language-selector-trigger.component';
import { InlineAlertComponent } from '../../../../../shared/components/inline-alert/inline-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppearanceThemeToggle,
    AppearanceConfiguratorTrigger,
    LanguageSelectorTrigger,
    InlineAlertComponent,
  ],
})
export class LoginComponent implements OnInit {
  public readonly facade = inject(AuthFacade);
  private readonly _loginI18nVmService = inject(LoginI18nVmService);
  private readonly _destroyRef = inject(DestroyRef);
  protected readonly vm = this._loginI18nVmService.vm;
  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.group({
    email: ['tenant-admin@dev.com', [Validators.required, Validators.email]],
    password: ['TenantAdmin@123456', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  public ngOnInit(): void {
    merge(this.form.controls.email.valueChanges, this.form.controls.password.valueChanges)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.facade.clearLoginError();
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.facade.login(email!, password!);
  }
}
