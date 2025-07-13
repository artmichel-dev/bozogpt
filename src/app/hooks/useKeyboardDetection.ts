import { useEffect, useState } from 'react';

export function useKeyboardDetection(inputRef?: React.RefObject<HTMLInputElement | null>) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [, setInitialViewportHeight] = useState(0);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Set initial viewport height on mount
    const height = window.innerHeight;
    setInitialViewportHeight(height);

    const scrollToInput = () => {
      if (inputRef && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 350);
      }
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = height - currentHeight;
      
      // If height difference is significant (>150px), keyboard is likely open
      if (heightDifference > 150) {
        setIsKeyboardOpen(true);
        document.body.classList.add('keyboard-open');
        // Adjust the viewport offset for centering
        document.documentElement.style.setProperty(
          '--screen-optical-compact-offset-amount', 
          `${heightDifference * 0.3}px`
        );
        scrollToInput();
      } else {
        setIsKeyboardOpen(false);
        document.body.classList.remove('keyboard-open');
        // Reset the offset
        document.documentElement.style.setProperty(
          '--screen-optical-compact-offset-amount', 
          '0px'
        );
      }
      

    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Small delay to allow keyboard to appear
        setTimeout(() => {
          const currentHeight = window.innerHeight;
          const heightDifference = height - currentHeight;
          if (heightDifference > 150) {
            setIsKeyboardOpen(true);
            document.body.classList.add('keyboard-open');
            // Adjust centering when keyboard appears
            document.documentElement.style.setProperty(
              '--screen-optical-compact-offset-amount', 
              `${heightDifference * 0.3}px`
            );
            scrollToInput();
          }
        }, 300);
      }
    };

    const handleFocusOut = () => {
      // Delay to allow keyboard to hide
      setTimeout(() => {
        const currentHeight = window.innerHeight;
        const heightDifference = height - currentHeight;
        if (heightDifference <= 150) {
          setIsKeyboardOpen(false);
          document.body.classList.remove('keyboard-open');
          // Reset centering when keyboard disappears
          document.documentElement.style.setProperty(
            '--screen-optical-compact-offset-amount', 
            '0px'
          );
        }
      }, 300);
    };

    // Handle orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        const newHeight = window.innerHeight;
        setInitialViewportHeight(newHeight);
        // Reset keyboard state on orientation change
        setIsKeyboardOpen(false);
        document.body.classList.remove('keyboard-open');
        document.documentElement.style.setProperty(
          '--screen-optical-compact-offset-amount', 
          '0px'
        );
      }, 500);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.body.classList.remove('keyboard-open');
      document.documentElement.style.setProperty(
        '--screen-optical-compact-offset-amount', 
        '0px'
      );
    };
  }, [inputRef]);

  return { isKeyboardOpen };
} 