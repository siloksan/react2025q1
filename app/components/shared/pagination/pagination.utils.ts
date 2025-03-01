export const EMPTY_BUTTON_VALUE = 0;

export function getButtonsNameArray(currentPage: number, totalPages: number) {
  const maxButtons = 7;
  const array = [];
  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i += 1) {
      array.push(i);
    }
  } else if (currentPage < 5) {
    array.push(1, 2, 3, 4, 5, EMPTY_BUTTON_VALUE, totalPages);
  } else if (totalPages - currentPage < 4) {
    array.push(
      1,
      EMPTY_BUTTON_VALUE,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    array.push(
      1,
      EMPTY_BUTTON_VALUE,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      EMPTY_BUTTON_VALUE,
      totalPages
    );
  }

  return array;
}
