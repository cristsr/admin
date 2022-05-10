import { InfiniteScrollDirective } from './infinite-scroll.directive';

describe('InfiniteScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new InfiniteScrollDirective({} as any, {} as any);
    expect(directive).toBeTruthy();
  });
});
