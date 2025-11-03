"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CardData {
  id?: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface CardStackProps {
  images?: (string | CardData)[];
  offset?: number;
  scaleStep?: number;
  dimStep?: number;
  stiff?: number;
  damp?: number;
  borderRadius?: number;
  ratio?: string;
  className?: string;
}

let idCounter = 0;
const genId = () => `card_${Date.now().toString(36)}_${idCounter++}`;

const placeholderImage = {
  src: "data:image/svg+xml;utf8," + encodeURIComponent(`
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#1F2937"/>
      <rect x="150" y="100" width="100" height="100" fill="#374151" rx="8"/>
      <circle cx="200" cy="150" r="20" fill="#6B7280"/>
    </svg>
  `),
  alt: "Placeholder"
};

function toObjList(arr: (string | CardData)[]): CardData[] {
  return (arr.length ? arr : [placeholderImage]).map(img => {
    if (typeof img === "string") return { id: genId(), src: img, alt: "" };
    if (img && typeof img === "object" && "src" in img) {
      const cardData = img as CardData;
      return { id: genId(), ...cardData };
    }
    return { id: genId(), src: placeholderImage.src, alt: placeholderImage.alt };
  });
}

export default function CardStack({
  images = [],
  offset = 10,
  scaleStep = 0.06,
  dimStep = 0.15,
  stiff = 170,
  damp = 26,
  borderRadius = 8,
  ratio = "16 / 9",
  className = "",
  ...rest
}: CardStackProps) {
  const [cards, setCards] = useState<CardData[]>(toObjList(images));

  useEffect(() => {
    const prev = cards.slice();
    const next: CardData[] = [];
    const srcList = images.length ? images : [placeholderImage];
    
    srcList.forEach(img => {
      const src = typeof img === "string" ? img : img.src;
      const idx = prev.findIndex(c => c.src === src);
      if (idx > -1) {
        next.push(prev.splice(idx, 1)[0]);
      } else {
        if (typeof img === "object" && "src" in img) {
          next.push({ id: genId(), ...img });
        } else {
          next.push({ id: genId(), src, alt: "" });
        }
      }
    });
    setCards(next);
  }, [JSON.stringify(images)]);

  const moveToEnd = (i: number) => setCards(prev => [...prev.slice(i + 1), prev[i]]);

  const spring = stiff || damp ? { type: "spring" as const, stiffness: stiff, damping: damp } : undefined;

  const wrapperStyle = {
    position: "relative" as const,
    width: "100%",
    aspectRatio: ratio,
    overflow: "visible" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  };

  return (
    <div {...rest} style={wrapperStyle} className={className}>
      <ul style={{ position: "relative", width: "100%", height: "100%", margin: 0, padding: 0 }}>
        {cards.map(({ id, src, alt, title, description }, i) => {
          const front = i === 0;
          const brightness = Math.max(0.1, 1 - i * dimStep);
          const baseZ = cards.length - i;

          return (
            <motion.li
              key={id}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: borderRadius,
                listStyle: "none",
                cursor: front ? "grab" : "auto",
                overflow: "hidden",
                touchAction: "none",
                zIndex: baseZ,
                transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
              }}
              animate={{
                top: `calc(${i * -offset}%)`,
                scale: 1 - i * scaleStep,
                filter: `brightness(${brightness})`,
                zIndex: baseZ,
                transition: spring,
              }}
              drag={front ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              onDragEnd={() => moveToEnd(i)}
              whileDrag={
                front
                  ? {
                      zIndex: cards.length,
                      cursor: "grabbing",
                      scale: 1 - i * scaleStep + 0.05,
                      rotate: 2,
                    }
                  : {}
              }
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={alt || "Card image"}
                  fill
                  className="object-cover"
                  style={{ pointerEvents: "none" }}
                />
                {(title || description) && (
                  <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                    <div className="text-white">
                      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
                      {description && <p className="text-sm opacity-90">{description}</p>}
                    </div>
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
