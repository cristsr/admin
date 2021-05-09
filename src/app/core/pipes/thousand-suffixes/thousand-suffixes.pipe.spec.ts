import { ThousandSuffixesPipe } from './thousand-suffixes.pipe';

describe('ThousandSuffixesPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandSuffixesPipe();
    expect(pipe).toBeTruthy();
  });
});
