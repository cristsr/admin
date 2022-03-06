import { ThousandSuffixPipe } from './thousand-suffixes.pipe';

describe('ThousandSuffixesPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandSuffixPipe();
    expect(pipe).toBeTruthy();
  });
});
