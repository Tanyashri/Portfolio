import React, { useState, useEffect, useRef } from 'react';

interface AnimatedDecoderTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  intervalSpeed?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$/<>{}[]*+=-~';

export const AnimatedDecoderText: React.FC<AnimatedDecoderTextProps> = ({
  text,
  className = '',
  triggerOnHover = true,
  intervalSpeed = 25,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDecode = () => {
    if (isDecoding) return;
    setIsDecoding(true);
    iterationRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterationRef.current) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iterationRef.current += 1 / 2;

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsDecoding(false);
      }
    }, intervalSpeed);
  };

  useEffect(() => {
    // Initial mount subtle decode
    startDecode();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startDecode();
    }
  };

  return (
    <Component
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
};
