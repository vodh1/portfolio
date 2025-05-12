import React, { useRef, useEffect, memo } from "react";
import { cn } from "../../utils/cn";

interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speedFactor?: number;
}

// Export SparklesCore component
const SparklesCore = memo(({
  id,
  background = "transparent",
  minSize = 0.6,
  maxSize = 2.0,
  particleDensity = 25,
  className,
  particleColor = "#FFFFFF",
  speedFactor = 0.6,
  ...props
}: SparklesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create and append canvas element
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", id || "sparkles-canvas");
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    
    container.appendChild(canvas);
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Configure sparkles
    const baseParticleCount = Math.min(
      180,
      Math.floor((containerWidth * containerHeight) / (3500 / particleDensity))
    );
    
    const particles: Particle[] = [];
    
    // Enhanced Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      twinkleSpeed: number;
      twinkleDirection: number;
      pulseSpeed: number;
      glowSize: number;
      
      constructor() {
        this.x = Math.random() * containerWidth;
        this.y = Math.random() * containerHeight;
        this.baseSize = minSize + Math.random() * (maxSize - minSize);
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.25 * speedFactor;
        this.speedY = (Math.random() - 0.5) * 0.25 * speedFactor;
        this.color = particleColor;
        this.alpha = 0.3 + Math.random() * 0.5;
        this.twinkleSpeed = 0.02 + Math.random() * 0.015;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.glowSize = 2 + Math.random() * 2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around edges
        if (this.x > containerWidth) this.x = 0;
        else if (this.x < 0) this.x = containerWidth;
        
        if (this.y > containerHeight) this.y = 0;
        else if (this.y < 0) this.y = containerHeight;
        
        // Smoother twinkle effect with direction changes
        this.alpha += this.twinkleDirection * this.twinkleSpeed;
        
        // Change direction when reaching bounds
        if (this.alpha > 0.8) {
          this.alpha = 0.8;
          this.twinkleDirection = -1;
        } else if (this.alpha < 0.2) {
          this.alpha = 0.2;
          this.twinkleDirection = 1;
        }
        
        // Size pulsing effect
        this.size = this.baseSize * (0.85 + 0.3 * Math.sin(Date.now() * this.pulseSpeed));
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * this.glowSize
        );
        
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = this.alpha * 0.3;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw main sparkle
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw highlight
        ctx.globalAlpha = this.alpha * 0.8;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create initial particles
    for (let i = 0; i < baseParticleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop with increased FPS
    let animationFrame: number;
    let lastFrameTime = 0;
    const targetFPS = 45;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      animationFrame = requestAnimationFrame(animate);
      
      // Throttle frame rate
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) return;
      
      lastFrameTime = timestamp - (elapsed % frameInterval);
      
      ctx.clearRect(0, 0, containerWidth, containerHeight);
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
    };
    
    animate(0);
    
    // Efficient resize handler with debounce
    let resizeTimer: number;
    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      
      resizeTimer = window.setTimeout(() => {
        if (!containerRef.current || !canvas) return;
        
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;
        
        canvas.width = newWidth;
        canvas.height = newHeight;
      }, 200);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [id, background, minSize, maxSize, particleDensity, particleColor, speedFactor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ background }}
      {...props}
    />
  );
});

// Named export for direct imports
export { SparklesCore };

// Default export for lazy loading
export default { SparklesCore }; 