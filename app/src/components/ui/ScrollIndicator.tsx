"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ScrollIndicator() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("works");
    if (element) {
      const offsetTop = element.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href="#works"
        onClick={handleClick}
        className="px-2.5 py-1 rounded-r-full rounded-bl-full bg-blue-400 text-white text-xs font-medium hover:bg-blue-400 hover:rounded-full transition-colors inline-flex items-center gap-1.5 shadow-lg min-w-16"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.span key={isHovered ? "click-me" : "scroll"} className="flex">
            {(isHovered ? "Click me" : "Scrollll")
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </motion.span>
        </AnimatePresence>
      </motion.a>

      {/* Floating Arrow Cursor - Left Side (Flipped) */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            className="absolute -top-5 -left-6 w-5 h-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [0, -5, 0],
              y: [0, -3, 0],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { delay: 0, duration: 0.2 },
              x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
          >
            <Image
              src="/assets/images/hero_1.png"
              alt="Cursor"
              width={32}
              height={32}
              className="w-full h-full object-contain drop-shadow-md scale-x-[-1]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
