import { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  /** Extra classes for positioning. Defaults to a fixed full-viewport layer. */
  className?: string;
  /**
   * Fraction of the canvas width (from the left) the nodes are confined to.
   * 1 = full width (default); 0.55 keeps the network on the left half.
   */
  widthFraction?: number;
}

/**
 * Animated network of nodes connected by edges — a subtle, theme-aware
 * "complex network" backdrop (inspired by network-science lab sites).
 * Nodes drift, link to nearby nodes, and gently react to the cursor.
 * Color is read from the `--primary` CSS token, so it follows the theme.
 */
export const NetworkBackground = ({
  className,
  widthFraction = 1,
}: NetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let maxX = 0;
    let dpr = 1;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    let hsl = { h: "20", s: "50%", l: "50%" };
    const readColor = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      const parts = raw.split(/\s+/);
      if (parts.length >= 3) hsl = { h: parts[0], s: parts[1], l: parts[2] };
    };
    const stroke = (a: number) => `hsla(${hsl.h}, ${hsl.s}, ${hsl.l}, ${a})`;

    const CONNECT = 150;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maxX = width * Math.min(Math.max(widthFraction, 0.1), 1);

      const count = Math.max(
        26,
        Math.min(70, Math.round((maxX * height) / 22000))
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * maxX,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 1.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= maxX) n.vx *= -1;
        if (n.y <= 0 || n.y >= height) n.vy *= -1;

        if (mouse.active && mouse.x <= maxX + 120) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 170 && d > 0.01) {
            n.x += (dx / d) * 0.22;
            n.y += (dy / d) * 0.22;
          }
        }
        // keep nodes inside the confined band
        if (n.x < 0) n.x = 0;
        if (n.x > maxX) n.x = maxX;
        if (n.y < 0) n.y = 0;
        if (n.y > height) n.y = height;
      }

      // edges between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < CONNECT) {
            ctx.strokeStyle = stroke((1 - dist / CONNECT) * 0.45);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // edges to the cursor
      if (mouse.active) {
        const reach = CONNECT * 1.4;
        for (const n of nodes) {
          const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (dist < reach) {
            ctx.strokeStyle = stroke((1 - dist / reach) * 0.55);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = stroke(0.85);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    readColor();
    resize();
    if (prefersReduced) draw();
    else loop();

    const onResize = () => resize();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
    };
  }, [widthFraction]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "fixed inset-0 h-full w-full"}
    />
  );
};
