import { useRef, useCallback } from 'react';

export function useTextMeasure(fontFamily: string = 'system-ui, sans-serif') {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const measure = useCallback((text: string, fontSize: number): number => {
    if (!ctxRef.current) {
      const canvas = document.createElement('canvas');
      ctxRef.current = canvas.getContext('2d');
    }
    const ctx = ctxRef.current!;
    ctx.font = `600 ${fontSize}px ${fontFamily}`;
    return ctx.measureText(text).width;
  }, [fontFamily]);

  return measure;
}
