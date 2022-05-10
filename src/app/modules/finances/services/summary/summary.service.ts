import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'core/services/config';
import { ENV } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private readonly financesUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.financesUrl = this.config.get(ENV.FINANCES_API);
  }

  getSummary(): Observable<any> {
    const url = this.financesUrl + 'summary';
    return this.http.get(url);
  }
}
