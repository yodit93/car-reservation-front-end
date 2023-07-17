export const scrollLeft = (container) => {
  const scrollAmount = container.offsetWidth / 2;
  container.scrollTo({
    left: container.scrollLeft - scrollAmount,
    behavior: 'smooth',
  });
};

export const scrollRight = (container) => {
  const scrollAmount = container.offsetWidth / 2;
  container.scrollTo({
    left: container.scrollLeft + scrollAmount,
    behavior: 'smooth',
  });
};

export const handleScroll = (container, setIsFirstVisible, setIsLastVisible) => {
  const firstItem = container.firstElementChild;
  const containerRect1 = container.getBoundingClientRect();
  const firstItemRect = firstItem.getBoundingClientRect();
  setIsFirstVisible(firstItemRect.left >= containerRect1.left);
  const lastItem = container.lastElementChild;
  const containerRect = container.getBoundingClientRect();
  const lastItemRect = lastItem.getBoundingClientRect();
  setIsLastVisible(lastItemRect.right <= containerRect.right);
};
