import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if value is empty', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should not truncate string if it is shorter than limit', () => {
    const text = 'Short text';
    expect(pipe.transform(text, 20)).toBe('Short text');
  });

  it('should truncate string and add ellipsis if it exceeds limit', () => {
    const text = 'This is a very long text used for testing';
    // Ліміт 10 символів. Очікуємо перші 10 символів + '...'
    // 'This is a ' (10 chars) -> 'This is a ...'
    expect(pipe.transform(text, 10)).toBe('This is a ...');
  });

  it('should use default limit (25) if not provided', () => {
    const text = '123456789012345678901234567890'; // 30 chars
    const result = pipe.transform(text);
    expect(result.length).toBe(25 + 3); // 25 chars + 3 dots
    expect(result.endsWith('...')).toBeTrue();
  });
});
