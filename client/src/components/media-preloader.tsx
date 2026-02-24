import { useEffect, useState } from "react";

interface MediaPreloaderProps {
  onComplete?: () => void;
}

export function MediaPreloader({ onComplete }: MediaPreloaderProps) {
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // Simplified preloader - just check if video element can load
    const preloadVideo = async () => {
      const videoSources = [
        '/vedio/Black Elegant Wedding Menu.mp4',
        './vedio/Black Elegant Wedding Menu.mp4',
        '/assets/vedio/Black Elegant Wedding Menu.mp4'
      ];

      let videoLoaded = false;
      
      for (const source of videoSources) {
        if (videoLoaded) break;
        
        try {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.muted = true; // Important for mobile autoplay
          video.playsInline = true;
          
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Timeout')), 2000);
            
            video.addEventListener('loadedmetadata', () => {
              clearTimeout(timeout);
              videoLoaded = true;
              console.log(`Video metadata loaded from: ${source}`);
              resolve(null);
            }, { once: true });
            
            video.addEventListener('error', () => {
              clearTimeout(timeout);
              reject(new Error('Video load failed'));
            }, { once: true });
            
            video.src = source;
          });
          
          break; // Success, exit loop
        } catch (error) {
          console.warn(`Video preload failed for ${source}:`, error);
        }
      }

      setCompleted(true);
      onComplete?.();
    };

    preloadVideo();
  }, [onComplete]);

  return null; // Silent preloader
}