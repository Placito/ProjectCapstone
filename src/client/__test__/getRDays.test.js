const { getRDays } = require('../scripts/getRDays');

const now = new Date();

test('Give me the remaining days from now to the date I will enter as a parameter', () => {
  // The correct syntax is to call toBe() on the result of expect()
  expect(getRDays(now)).toBeCloseTo(0);
});