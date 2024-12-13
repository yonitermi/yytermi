import { useState, useEffect } from 'react';

export const useAccessibilityState = () => {
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (contrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [contrast]);

  useEffect(() => {
    if (grayscale) {
      document.body.classList.add('grayscale-mode');
    } else {
      document.body.classList.remove('grayscale-mode');
    }
  }, [grayscale]);

  useEffect(() => {
    if (keyboardMode) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }
  }, [keyboardMode]);

  const adjustFontSize = (increase: boolean) => {
    setFontSize(prev => {
      const newSize = increase ? prev + 10 : prev - 10;
      return Math.min(Math.max(newSize, 80), 150);
    });
  };

  return {
    fontSize,
    contrast,
    grayscale,
    keyboardMode,
    setContrast,
    setGrayscale,
    setKeyboardMode,
    adjustFontSize,
  };
};