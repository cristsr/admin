import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

export function splashFactory(document: Document, router: Router) {
  return () => {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        document.body.classList.add('splash-screen-hidden');
      });
  };
}
