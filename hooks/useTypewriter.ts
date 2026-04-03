import { useEffect, useState } from 'react';

export const useTypewriter = (text: string, isActive: boolean, speed = 18) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!isActive) {
      return;
    }

    setTypedText('');
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [isActive, speed, text]);

  return typedText;
};
