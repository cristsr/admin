/**
 * @deprecated
 */
export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

/**
 * @deprecated
 * @param direction - the direction of the swipe
 */
export function formatDirection(direction: number): Direction {
  const directions: { [key: number]: Direction } = {
    [Hammer.DIRECTION_NONE]: 'none',
    [Hammer.DIRECTION_UP]: 'up',
    [Hammer.DIRECTION_DOWN]: 'down',
    [Hammer.DIRECTION_LEFT]: 'left',
    [Hammer.DIRECTION_RIGHT]: 'right',
  };

  return directions[direction];
}

export function isNone(direction: number): boolean {
  return direction === Hammer.DIRECTION_NONE;
}

export function isRight(direction: number): boolean {
  return direction === Hammer.DIRECTION_RIGHT;
}

export function isLeft(direction: number): boolean {
  return direction === Hammer.DIRECTION_LEFT;
}

export function isHorizontal(direction: number): boolean {
  return isLeft(direction) || isRight(direction);
}
