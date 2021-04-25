import { ChartDirective } from './chart.directive';

describe('ChartDirective', () => {
  it('should create an instance', () => {
    const directive = new ChartDirective({} as any);
    expect(directive).toBeTruthy();
  });
});
