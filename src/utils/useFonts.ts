import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // 1. Create a race condition
        const fontPromise = Font.loadAsync({
          'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
          'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
          'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        });

        // 2. Set a 3-second timeout limit
        const timeoutPromise = new Promise((resolve) => 
          setTimeout(resolve, 3000)
        );

        // 3. Race them! Whichever finishes first wins.
        await Promise.race([fontPromise, timeoutPromise]);
        
        setFontsLoaded(true);
      } catch (err) {
        // 4. If fonts fail completely, still load the app!
        console.warn('Fonts failed to load, using fallback font.', err);
        setFontsLoaded(true); 
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};