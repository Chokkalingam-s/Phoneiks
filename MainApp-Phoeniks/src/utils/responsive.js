import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < 420,
    isTablet: width >= 420 && width < 900,
    isDesktop: width >= 900
  };
};
