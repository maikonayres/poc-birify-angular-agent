import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SKIP_SESSION_EXPIRED_HANDLING } from '../../../../../core/http/interceptors/error-interceptor';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { map, Observable } from 'rxjs';
import { AuthSessionEntity } from '../../../domain/entity/auth-session.entity';
import { AuthMapper } from '../mappers/auth.mapper';
import { AuthSessionApiResponseDto } from '../dtos/auth-session-api-response.dto';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestAuthRepository implements AuthRepository {
  private readonly _http = inject(HttpClient);

  private readonly _baseUrl = environment.apiUrl;

  public login(email: string, password: string): Observable<AuthSessionEntity> {
    const payload: LoginRequestDto = { email, password };
    const context = new HttpContext().set(SKIP_SESSION_EXPIRED_HANDLING, true);

    return this._http
      .post<AuthSessionApiResponseDto>(`${this._baseUrl}/auth/login`, payload, { context })
      .pipe(map(AuthMapper.toSessionEntity));
  }

  public logout(): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/auth/logout`, {});
  }

  public getCurrentUser(): Observable<AuthSessionEntity> {
    return this._http
      .get<AuthSessionApiResponseDto>(`${this._baseUrl}/me`)
      .pipe(map(AuthMapper.toSessionEntity));
  }
}
