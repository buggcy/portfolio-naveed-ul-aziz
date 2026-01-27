"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Project } from "@/app/src/types";
import { useRef } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const ref = useRef(null);

  // Scroll-based parallax animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect - reduced for better mobile performance
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      style={{ opacity, scale }}
      className="group cursor-pointer h-full block"
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 h-full">
        <motion.div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden rounded-[16px] sm:rounded-[20px] md:rounded-[24px]">
          {/* Image with parallax */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            variants={imageHoverVariants}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover ${project.imagePosition || 'object-center'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={index < 2}
              quality={90}
            />
          </motion.div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />

          {/* Text overlay on image */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            <motion.h3
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight break-words"
              style={{ fontFamily: "var(--font-inter)" }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              title={project.title}
            >
              {project.title.split(" ").slice(0, 2).join(" ")}
            </motion.h3>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
