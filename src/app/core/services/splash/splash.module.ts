import { NgModule } from '@angular/core';
import { SplashService } from './splash.service';

@NgModule({
  providers: [SplashService],
})
export class SplashModule {
  constructor(private _splash: SplashService) {}
}
