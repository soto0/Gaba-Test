/** Окно из номеров страниц вокруг текущей (для блока пагинации). */
export const getPageWindow = (
  currentPage: number,
  totalPages: number,
  windowSize = 5,
): number[] => {
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
};
