import { getButtonsNameArray, EMPTY_BUTTON_VALUE } from './pagination.utils';

describe('getButtonsNameArray', () => {
  it('should return all pages when totalPages is less than or equal to maxButtons', () => {
    expect(getButtonsNameArray(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getButtonsNameArray(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should return correct array when currentPage is less than 5 and totalPages is greater than maxButtons', () => {
    expect(getButtonsNameArray(1, 10)).toEqual([
      1,
      2,
      3,
      4,
      5,
      EMPTY_BUTTON_VALUE,
      10,
    ]);
    expect(getButtonsNameArray(4, 10)).toEqual([
      1,
      2,
      3,
      4,
      5,
      EMPTY_BUTTON_VALUE,
      10,
    ]);
  });

  it('should return correct array when totalPages - currentPage is less than 4', () => {
    expect(getButtonsNameArray(8, 10)).toEqual([
      1,
      EMPTY_BUTTON_VALUE,
      6,
      7,
      8,
      9,
      10,
    ]);
    expect(getButtonsNameArray(10, 10)).toEqual([
      1,
      EMPTY_BUTTON_VALUE,
      6,
      7,
      8,
      9,
      10,
    ]);
  });

  it('should return correct array when currentPage is in the middle and totalPages is greater than maxButtons', () => {
    expect(getButtonsNameArray(5, 10)).toEqual([
      1,
      EMPTY_BUTTON_VALUE,
      4,
      5,
      6,
      EMPTY_BUTTON_VALUE,
      10,
    ]);
    expect(getButtonsNameArray(6, 10)).toEqual([
      1,
      EMPTY_BUTTON_VALUE,
      5,
      6,
      7,
      EMPTY_BUTTON_VALUE,
      10,
    ]);
  });
});
