import { HttpClient } from '@angular/common/http';
import { catchError, pluck, tap } from 'rxjs';
import { ThemeService } from 'core/services';
import { ThemeConfig } from 'layout/types';

export function themeConfig(http: HttpClient, theme: ThemeService) {
  return () =>
    http.get('assets/tailwind.json').pipe(
      catchError(() => []),
      pluck('palettes', 'primary'),
      tap((config: ThemeConfig[]) => theme.configureThemes(config)),
    );
}
