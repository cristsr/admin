import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from './config.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configValue: BehaviorSubject<any>;


  constructor(@Inject(APP_CONFIG) config: any) {
    this.configValue = new BehaviorSubject(config);
  }

  set config(value: any)
  {
    // Merge the new config over to the current config
    const config = merge({}, this.configValue.getValue(), value);

    // Execute the observable
    this.configValue.next(config);
  }

  get config$(): Observable<any>
  {
    return this.configValue.asObservable();
  }
}
