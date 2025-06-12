/**
 * Create shooting star animation with arrowhead
 */
export const createShootingStarAnimation = (arrow: SVGPathElement, onComplete?: () => void) => {
  const rotatingGroup = arrow.closest('.record') || arrow.parentElement;
  if (!rotatingGroup) return;

  const pathLength = arrow.getTotalLength();
  const arrowColor = arrow.style.stroke || arrow.getAttribute('stroke') || '#0074d9';
  
  // Create shooting arrowhead element
  const shootingArrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  shootingArrow.setAttribute('points', '0,0 8,3 0,6'); // Arrowhead shape pointing right
  shootingArrow.setAttribute('fill', arrowColor);
  shootingArrow.style.filter = 'drop-shadow(0 0 4px rgba(255,215,0,0.8))'; // Golden glow
  shootingArrow.classList.add('shooting-star');

  // Create trail element
  const trail = document.createElementNS("http://www.w3.org/2000/svg", "path") as SVGPathElement;
  trail.style.stroke = arrowColor;
  trail.style.strokeWidth = '2';
  trail.style.fill = 'none';
  trail.style.strokeDasharray = '0 ' + pathLength;
  trail.setAttribute('d', arrow.getAttribute('d') || '');
  trail.classList.add('shooting-star-trail');

  rotatingGroup.appendChild(trail);
  rotatingGroup.appendChild(shootingArrow);

  const duration = 1000;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentLength = easedProgress * pathLength;
    const point = arrow.getPointAtLength(currentLength);
    
    // Calculate the tangent angle at the current point to orient the arrowhead
    let angle = 0;
    if (currentLength > 0 && currentLength < pathLength) {
      const nextLength = Math.min(currentLength + 1, pathLength);
      const nextPoint = arrow.getPointAtLength(nextLength);
      angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
    }
    
    // Position and rotate the arrowhead
    shootingArrow.setAttribute('transform', `translate(${point.x},${point.y}) rotate(${angle}) translate(-4,-3)`);
    (shootingArrow as any).style.opacity = progress < 0.1 ? progress * 10 : (progress > 0.9 ? (1 - progress) * 10 : '1');
    
    const trailLength = currentLength;
    trail.style.strokeDasharray = `${trailLength} ${pathLength - trailLength}`;
    trail.style.opacity = Math.min(easedProgress + 0.3, 0.8).toString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        shootingArrow.remove();
        trail.style.transition = 'opacity 0.5s ease-out';
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
        onComplete?.();
      }, 100);
    }
  };
  
  requestAnimationFrame(animate);
}; 