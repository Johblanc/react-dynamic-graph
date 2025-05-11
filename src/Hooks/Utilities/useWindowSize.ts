import { useEffect, useState } from "react";

/**
 * Custom hook to get the current window size.
 * 
 * @returns { width?: number, height?: number } - The current window size.
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width?: number,
    height?: number,
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};