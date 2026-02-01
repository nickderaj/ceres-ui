import { describe, it, expect } from 'vitest';
import { generateHeadingId, getTextFromChildren } from './heading-utils';

describe('generateHeadingId', () => {
  it('converts text to a lowercase slug', () => {
    expect(generateHeadingId('Hello World')).toBe('hello-world');
  });

  it('strips special characters', () => {
    expect(generateHeadingId('What is MACD?')).toBe('what-is-macd');
  });

  it('collapses multiple spaces and dashes', () => {
    expect(generateHeadingId('Multiple   Spaces   Here')).toBe('multiple-spaces-here');
  });

  it('handles strings with numbers', () => {
    expect(generateHeadingId('Step 1: Introduction')).toBe('step-1-introduction');
  });

  it('returns empty string for empty input', () => {
    expect(generateHeadingId('')).toBe('');
  });
});

describe('getTextFromChildren', () => {
  it('extracts text from a plain string', () => {
    expect(getTextFromChildren('hello')).toBe('hello');
  });

  it('converts numbers to strings', () => {
    expect(getTextFromChildren(42)).toBe('42');
  });

  it('concatenates text from arrays', () => {
    expect(getTextFromChildren(['hello', ' ', 'world'])).toBe('hello world');
  });

  it('returns empty string for null/undefined', () => {
    expect(getTextFromChildren(null)).toBe('');
    expect(getTextFromChildren(undefined)).toBe('');
  });
});
