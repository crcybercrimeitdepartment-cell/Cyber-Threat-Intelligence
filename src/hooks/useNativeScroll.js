import { useState, useEffect } from 'react';

export function useNativeScroll(scrollContainerRef, totalItems) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(totalItems > 0 ? totalItems - 1 : 0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      if (totalItems === 0) return;
      const cardWidth = container.scrollWidth / totalItems;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const calculatedMaxIndex = Math.max(0, Math.round(maxScroll / cardWidth));
      setMaxIndex(calculatedMaxIndex);

      const newIndex = Math.min(calculatedMaxIndex, Math.round(container.scrollLeft / cardWidth));
      setCurrentIndex(newIndex);
      setCanScrollLeft(container.scrollLeft > 10);
      setCanScrollRight(container.scrollLeft < maxScroll - 10);
    };

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    
    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [totalItems, scrollContainerRef]);

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current && totalItems > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / totalItems;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let targetLeft = index * cardWidth;
      // Guarantee the last card is fully visible by scrolling to absolute max
      if (index === maxIndex) {
        targetLeft = maxScroll;
      }
      
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    }
  };

  const slideLeft = () => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const slideRight = () => {
    scrollToIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return {
    currentIndex,
    maxIndex,
    canScrollLeft,
    canScrollRight,
    scrollToIndex,
    slideLeft,
    slideRight
  };
}
