import { FC, useEffect, useRef } from "react";

interface ImageWithPointProps {
  src: string;
  dotX: number;
  dotY: number;
}

// const dotRadius = 50;
const dotColor = "#ff0000";

export const ImageWithDot: FC<ImageWithPointProps> = ({ src, dotX, dotY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const canvas = context.canvas;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dotRadius = Math.floor((0.015 * (img.height + img.width)) / 2);
      // draw a circle
      context.fillStyle = dotColor;
      context.beginPath();
      context.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
      context.fill();
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const elementRelativeX = e.clientX - rect.left;
        const elementRelativeY = e.clientY - rect.top;
        const canvasRelativeX = (elementRelativeX * canvas.width) / rect.width;
        const canvasRelativeY = (elementRelativeY * canvas.height) / rect.height;
        console.log(canvasRelativeX, canvasRelativeY);
      });
    };
  }, [canvasRef, dotX, dotY]);

  return <canvas className="block w-full" ref={canvasRef} />;
};
