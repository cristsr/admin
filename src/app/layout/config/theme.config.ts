import { HttpClient } from '@angular/common/http';
import { catchError, pluck, tap } from 'rxjs';
import { ThemeService } from 'core/services';

export function themeConfig(http: HttpClient, theme: ThemeService) {
  return () =>
    http.get('assets/tailwind.json').pipe(
      catchError(() => []),
      pluck('colors'),
      tap((config) => theme.configureThemes(config)),
    );
}
