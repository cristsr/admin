import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONFIG_OPTIONS } from './config.constants';
import { ConfigOptions } from './config.types';
import { HttpClient } from '@angular/common/http';
import { assign } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class ConfigService<K = Record<string, any>> {
  private config: K = {} as K;

  constructor(
    @Inject(CONFIG_OPTIONS)
    private options: ConfigOptions,
    private http: HttpClient,
  ) {}

  loadConfig(): Observable<any> {
    const path = this.options.path;

    if (!path) {
      throw new Error('Config path is not defined');
    }

    return this.http.get(path).pipe(
      tap((config: K) => {
        assign(this.config, config);

        if (this.options.validate) {
          this.validateConfig();
        }

        console.log('Config loaded', this.config);
      }),
    );
  }

  private validateConfig(): void {
    this.options.validate(this.config);
  }

  get<T>(key: string): T {
    return this.config[key] as T;
  }
}
