import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement): HammerManager {
    return new Hammer.Manager(element, {
      touchAction: 'auto',
      inputClass: Hammer.TouchMouseInput,
      recognizers: [
        [Hammer.Pan, {
          direction: Hammer.DIRECTION_ALL
        }],
      ]
    });
  }
}
