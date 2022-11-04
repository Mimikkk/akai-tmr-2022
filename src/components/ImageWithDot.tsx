import { FC, useEffect, useRef } from "react";

interface ImageWithPointProps {
  src: string;
  dotX: number;
  dotY: number;
}

const dotRadius = 12;
const dotColor = "#ff0000";

export const ImageWithDot: FC<ImageWithPointProps> = ({ src, dotX, dotY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      context.canvas.height = img.height;
      context.canvas.width = img.width;
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height);

      // draw a circle
      context.fillStyle = dotColor;
      context.beginPath();
      context.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
      context.fill();
    };
  }, [canvasRef]);

  return <canvas className="block w-full" ref={canvasRef} />;
};
