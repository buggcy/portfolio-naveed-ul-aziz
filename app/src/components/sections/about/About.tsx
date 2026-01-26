"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/app/src/utils/animations";

export default function About() {
  const textRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for text animation
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "start 0.3"],
  });

  const text =
    "I’m Abdul Rehman, CEO and Founder with a focus on real estate development and cross-border trade. I lead Royal Swift Services, Best Deal Marketing, and Al Hamad Developers, delivering investor-ready housing, compliant export operations, and sustainable programs. My work is guided by trust, regulatory excellence, and long-term value creation for partners across Punjab and the GCC.";
  const words = useMemo(() => text.split(" "), [text]);
  const easeCurve: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

  const fadeUpInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 };
  const fadeUpWhileInView = { opacity: 1, y: 0 };
  const fadeUpTransition = { duration: 0.8, ease: easeCurve };

  const badgesContainerVariants = useMemo(
    () => ({
      hidden: { opacity: prefersReducedMotion ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: prefersReducedMotion
          ? undefined
          : { staggerChildren: 0.1, when: "beforeChildren" },
      },
    }),
    [prefersReducedMotion]
  );

  const badgeVariants = useMemo(
    () => ({
      hidden: prefersReducedMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    }),
    [prefersReducedMotion]
  );

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#f5f5f5]"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Centered Layout */}
        <div className="flex flex-col items-center text-center">
          {/* Profile Image with Name Card */}
          <motion.div
            initial={fadeUpInitial}
            whileInView={fadeUpWhileInView}
            viewport={{ once: true, margin: "-100px" }}
            transition={fadeUpTransition}
            className="flex flex-col items-center mb-12 sm:mb-16"
          >
            <motion.div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 sm:mb-3 bg-gray-200 shadow-xl ring-1 ring-white border-2 border-gray-100">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/assets/images/abd.jpeg"
                  alt="Abdul Rehman"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top rounded-full"
                  priority
                />
              </motion.div>
            </motion.div>
            <motion.h2
              className="text-lg md:text-xl font-semibold text-black mb-1 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Abdul Rehman
            </motion.h2>
            <motion.p
              className="text-xs md:text-sm text-gray-500 font-medium px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Property developer & export operator
            </motion.p>
          </motion.div>

          {/* Main Description with Word-by-Word Animation */}
          <div
            ref={textRef}
            className="text-base md:text-xl lg:text-2xl font-medium text-gray-900 leading-loose mb-10 max-w-4xl"
          >
            {prefersReducedMotion ? (
              <p>{text}</p>
            ) : (
              words.map((word, index) => {
                const start = index / words.length;
                const end = start + 1 / words.length;

                return (
                  <AnimatedWord
                    key={`${word}-${index}`}
                    word={word}
                    start={start}
                    end={end}
                    progress={scrollYProgress}
                  />
                );
              })
            )}
          </div>

          {/* Let's talk! Button */}
          <motion.div
            initial={fadeUpInitial}
            whileInView={fadeUpWhileInView}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              ...fadeUpTransition,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
            className="mb-12"
          >
            <motion.a
              href="#contact"
              aria-label="Jump to contact section"
              className="inline-block px-6 py-1.5 rounded-full bg-[#fd2525] text-white text-lg font-medium hover:bg-gray-800 shadow-lg min-w-[150px]"
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.05,
                    }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            >
              Let&apos;s talk!
            </motion.a>
          </motion.div>

          {/* Info Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            variants={badgesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Badge 1 */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              variants={badgeVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }
              }
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Owner · Royal Swift Services (Export corridors)
              </span>
            </motion.div>

            {/* Badge 2 */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              variants={badgeVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }
              }
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                CEO · Best Deal Marketing (Property solutions)
              </span>
            </motion.div>

            {/* Badge 3 */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              variants={badgeVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }
              }
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs md:text-sm text-gray-700 font-medium">
                Partner · Al Hamad Developers (Housing & commercial)
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type AnimatedWordProps = {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
};

function AnimatedWord({ word, start, end, progress }: AnimatedWordProps) {
  // Smooth opacity transition from 0 to 1 for better fade-in effect
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}
