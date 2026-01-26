"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Testimonial } from "@/app/src/types";
import { useState, useEffect } from "react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  // Cursor tracking for 3D rotation effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for cursor-based rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 15,
  });

  // Detect if device is mobile/touch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse movement for cursor interactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position to -0.5 to 0.5 range
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Static rotation for the "sticky note" look
  const staticRotation = (index % 2 === 0 ? -1 : 1) * 2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotate: staticRotation + (index % 2 === 0 ? -10 : 10),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: staticRotation,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-2xl sm:rounded-3xl overflow-hidden h-full bg-[#f5f5f5] shadow-lg border-t-8 relative"
        style={{
          borderTopColor: testimonial.borderColor,
          transformOrigin: "center center",
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          boxShadow:
            "0 10px 30px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -5px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{
          boxShadow:
            "0 20px 40px -5px rgba(0, 0, 0, 0.25), 0 15px 20px -5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Image Section - Top */}
          {testimonial.image && (
            <motion.div
              className="relative h-[200px] sm:h-[250px] w-full overflow-hidden"
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          )}

          {/* Content Section - Bottom */}
          <motion.div
            className="p-6 sm:p-8 flex flex-col flex-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          >
            {/* Quote Marks */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15 + 0.4,
                type: "spring",
                stiffness: 200,
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                fill="none"
                className="text-gray-900"
              >
                <path
                  d="M10 18C10 12.477 14.477 8 20 8V12C16.686 12 14 14.686 14 18V20H20V32H8V20H10V18Z"
                  fill="currentColor"
                />
                <path
                  d="M30 18C30 12.477 34.477 8 40 8V12C36.686 12 34 14.686 34 18V20H40V32H28V20H30V18Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-lg sm:text-xl font-semibold text-black mb-3 leading-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
            >
              {testimonial.title}
            </motion.h3>

            {/* Quote */}
            <motion.p
              className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed flex-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
            >
              {testimonial.quote}
            </motion.p>

            {/* Author Info */}
            <motion.div
              className="mt-auto pt-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.7 }}
            >
              <p className="font-semibold text-base text-black">
                {testimonial.author}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {testimonial.role}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
