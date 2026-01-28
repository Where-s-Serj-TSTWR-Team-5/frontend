import { describe, it, expect } from 'vitest';
import '../stores/auth';

describe('Application smoke test', () => {
  it('loads core modules successfully', () => {
    expect(true).toBe(true);
  });
});
