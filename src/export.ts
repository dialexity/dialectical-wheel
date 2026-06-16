export interface ExportPNGOptions {
  width?: number;
  height?: number;
  background?: string;
}

export function exportWheelSVG(svg: SVGSVGElement): Blob {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const str = serializer.serializeToString(clone);
  return new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
}

export function exportWheelPNG(
  svg: SVGSVGElement,
  options: ExportPNGOptions = {}
): Promise<Blob> {
  const { width = 1024, background = 'white' } = options;
  const height = options.height || width;

  return new Promise((resolve, reject) => {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));

    const serializer = new XMLSerializer();
    const str = serializer.serializeToString(clone);
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(str);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob returned null'));
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Failed to load SVG as image'));
    img.src = url;
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
