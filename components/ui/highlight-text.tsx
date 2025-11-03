'use client';

import * as React from 'react';
import { motion, useInView, type HTMLMotionProps, type Transition, type UseInViewOptions } from 'motion/react';
import { cn } from '@/lib/utils';

type HighlightTextProps = HTMLMotionProps<'span'> & {
  text: string;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  transition?: Transition;
};

function HighlightText({
  ref,
  text,
  className,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  transition = { duration: 2, ease: 'easeInOut' },
  ...props
}: HighlightTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);

  return (
    <motion.span
      ref={localRef}
      data-slot="highlight-text"
      initial={{
        backgroundSize: '0% 100%',
      }}
      whileHover={{ 
        backgroundSize: '100% 100%',
        scale: 1.1,
        rotateX: 5,
        rotateY: 5,
        z: 50,
        filter: 'blur(0px)',
      }}
      transition={transition}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
        backgroundImage: 'linear-gradient(to right, hsl(var(--primary) / 1), hsl(var(--primary) / 1))',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={cn(
        `relative inline-block px-2 py-1 rounded-lg drop-shadow-[0_0_8px_hsl(var(--primary)/1)] drop-shadow-[0_0_16px_hsl(var(--primary)/0.9)] drop-shadow-[0_0_24px_hsl(var(--primary)/0.8)] drop-shadow-[0_0_32px_hsl(var(--primary)/0.6)]`,
        className,
      )}
      {...props}
    >
      {text}
    </motion.span>
  );
}

export { HighlightText, type HighlightTextProps };
