export interface Panable {
  onPanStart(event: any): void;

  onPanRight(event: any): void;

  onPanLeft(event: any): void;

  onPanUp(event: any): void;

  onPanDown(event: any): void;

  onPanEnd(event: any): void;
}
