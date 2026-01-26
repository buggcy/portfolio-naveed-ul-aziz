"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Article } from "@/app/src/types";
import { useRef } from "react";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const colorClasses: Record<string, string> = {
  lilac: "bg-[#f0ede8]",
  yellow: "bg-[#f0ede8]",
  orange: "bg-[#f0ede8]",
  green: "bg-[#f0ede8]",
};

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const bgColor = "bg-white";
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group cursor-pointer h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="bg-white rounded-xl overflow-hidden h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-2"
      >
        {/* Image Section */}
        {article.image && (
          <div className="relative w-full aspect-4/3 bg-[#f5f5f5] rounded-xl flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.7,
                delay: index * 0.1 + 0.2,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="relative w-4/5 h-4/5"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        )}

        {/* Content Section */}
        <div className="px-2 py-6 flex-1 flex flex-col">
          <motion.h3
            className="text-lg leading-tight font-medium text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.3,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            {article.title}
          </motion.h3>

          <motion.p
            className="text-gray-500 text-base leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.4,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            {article.description}
          </motion.p>

          <motion.div
            className="text-[13px] text-gray-400 mt-auto font-normal"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1 + 0.5,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            {article.date}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
