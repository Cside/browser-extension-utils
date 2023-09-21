import { ONE_DAY, ONE_HOUR, ONE_MINUTE } from './time';

test('ONE_DAY', () => {
  expect(ONE_MINUTE).toBe(60 * 1_000);
  expect(ONE_HOUR).toBe(60 * 60 * 1_000);
  expect(ONE_DAY).toBe(24 * 60 * 60 * 1_000);
});
