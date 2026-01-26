"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/app/src/constants";
import TestimonialCard from "@/app/src/components/ui/cards/TestimonialCard";
import { fadeInUp, staggerContainer } from "@/app/src/utils/animations";

export default function Testimonials() {
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonial" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-16 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4"
          >
            What my partners say
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Read on Linkedin
          </motion.a>
        </div>
      </div>
    </section>
  );
}
