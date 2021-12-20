export type Direction = 'up' | 'down' | 'left' | 'right';

export function formatDirection(direction: number): Direction {
  const directions: {[key: number]: Direction} = {
    [Hammer.DIRECTION_UP]: 'up',
    [Hammer.DIRECTION_DOWN]: 'down',
    [Hammer.DIRECTION_LEFT]: 'left',
    [Hammer.DIRECTION_RIGHT]: 'right'
  };

  return directions[direction];
}

export function isHorizontal(direction: Direction): boolean {
  return direction === 'left' || direction === 'right';
}

export function isRight(direction: Direction): boolean {
  return direction === 'right';
}

export function isLeft(direction: Direction): boolean {
  return direction === 'left';
}
