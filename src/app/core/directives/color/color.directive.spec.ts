import { ColorDirective } from './color.directive';

describe('ColorDirective', () => {
  it('should create an instance', () => {
    const directive = new ColorDirective({} as any);
    expect(directive).toBeTruthy();
  });
});
