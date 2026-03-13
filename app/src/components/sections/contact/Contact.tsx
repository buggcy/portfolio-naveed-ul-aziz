"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { staggerContainer } from "@/app/src/utils/animations";
import ContactForm from "@/app/src/components/ui/ContactForm";

export default function Contact() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [lahoreHovered, setLahoreHovered] = useState(false);
  const [goHomeHovered, setGoHomeHovered] = useState(false);
  const [dropFollowHovered, setDropFollowHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll detection for floating animation
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Scroll progress for section-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress for button animations
  const lahoreY = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
  const dropFollowY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const goHomeY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

  // Smooth spring for floating
  const floatingY = useMotionValue(0);
  const springY = useSpring(floatingY, { stiffness: 50, damping: 15 });

  useEffect(() => {
    if (!isScrolling) {
      floatingY.set(-15);
      const interval = setInterval(() => {
        floatingY.set(floatingY.get() === -15 ? 0 : -15);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      floatingY.set(0);
    }
  }, [isScrolling, floatingY]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden overflow-y-hidden bg-[#24242c]"
    >
      {/* 3D Plus Sign - Left side floating - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
          rotate: 0,
        }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          scale: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          y: { duration: 2, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0 },
        }}
        className="hidden lg:block absolute top-1/6 left-[18%] xl:left-[20%] w-20 h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 z-10"
      >
        <Image
          src="/assets/images/hero_3.png"
          alt="Plus sign"
          width={160}
          height={160}
          className="w-full h-full object-contain opacity-80"
          unoptimized
        />
      </motion.div>

      {/* 3D Map Pin - Bottom Left - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        className="hidden lg:block absolute left-[4%] xl:left-[6%] bottom-20 lg:bottom-24 xl:bottom-28 z-10"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52"
          >
            <Image
              src="/assets/images/hero_2.png"
              alt="Map pin"
              width={224}
              height={224}
              className="w-full h-full object-contain opacity-80"
              unoptimized
            />
          </motion.div>

          {/* Lahore Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ y: lahoreY }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="absolute top-[100%] left-full -translate-x-1/2 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#3d4149] text-white text-xs lg:text-sm font-medium hover:bg-[#4d5159] transition-colors shadow-lg min-w-[120px] lg:min-w-[140px]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setLahoreHovered(true)}
            onMouseLeave={() => setLahoreHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lahoreHovered ? "lahore-time" : "lahore-label"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {lahoreHovered
                  ? new Date().toLocaleTimeString("en-US", {
                      timeZone: "Asia/Karachi",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Lahore"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Drop me a follow Button - Top Right - Hidden on mobile and tablet */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ y: dropFollowY }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="hidden lg:block absolute top-28 xl:top-32 right-[15%] xl:right-[18%] z-20"
      >
        <div
          className="flex flex-col items-center gap-3"
          onMouseEnter={() => setDropFollowHovered(true)}
          onMouseLeave={() => setDropFollowHovered(false)}
        >
          <motion.button
            className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#3d4149] text-white text-xs lg:text-sm font-medium hover:bg-[#4d5159] transition-colors shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Drop me a follow
          </motion.button>

          
          <AnimatePresence>
            {dropFollowHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-lg"
              >
                {/* Twitter/X */}
                <motion.a
                  href="https://x.com/naveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/in/naveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://api.whatsapp.com/send?phone=923056801009&text=Lets%20Discuss%20Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg 
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/naveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  href="https://facebook.com/naveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/naveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 3D Hand - Right Side - Responsive sizing and positioning */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: -20, scale: 0.8 }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotate: [0, -8, 8, -5, 5, 0],
          scale: [0.8, 1.08, 1, 1.03, 1],
        }}
        viewport={{ once: true }}
        style={{
          y: isScrolling ? 0 : springY,
          right: "-15%",
          bottom: "8%",
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
          x: { duration: 1, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
          rotate: {
            duration: 1.2,
            delay: 1.5,
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.3, 0.6, 0.8, 0.95, 1],
          },
          scale: {
            duration: 1.2,
            delay: 1.5,
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.3, 0.6, 0.8, 1],
          },
        }}
        className="hidden sm:block absolute top-1/8 right-0 w-[25rem] h-[25rem] md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem] xl:w-[45rem] xl:h-[45rem] z-10"
      >
        <Image
          src="/assets/images/hand.png"
          alt="3D Hand"
          width={2000}
          height={2000}
          className="w-full h-full object-contain opacity-80"
          unoptimized
        />
      </motion.div>

      {/* Go home Button - Bottom Right - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ y: goHomeY }}
        transition={{
          duration: 0.8,
          delay: 0.7,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="hidden md:block absolute bottom-16 md:bottom-20 lg:bottom-24 right-[15%] lg:right-[18%] xl:right-[20%] z-20"
      >
        <div className="relative">
          <motion.a
            href="#hero"
            className="px-3 py-1.5 rounded-r-full rounded-bl-full bg-blue-400 text-white text-xs md:text-sm font-medium transition-colors shadow-lg inline-flex items-center gap-2 min-w-[90px] justify-center hover:rounded-full"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setGoHomeHovered(true)}
            onMouseLeave={() => setGoHomeHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={goHomeHovered ? "click-me" : "go-home"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {goHomeHovered ? "click me" : "Go home"}
              </motion.span>
            </AnimatePresence>
          </motion.a>

          {/* Floating Arrow Cursor */}
          <motion.div
            className="absolute -top-5 -left-5 md:-top-6 md:-left-6 w-4 h-4 md:w-5 md:h-5 pointer-events-none"
            style={{
              rotate: -90,
            }}
            animate={{
              x: [0, -3, 0],
              y: [0, -5, 0],
            }}
            transition={{
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
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content - Center - Fully responsive */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 sm:px-6">
        {/* Available for work - Top Center - Visible on all screens */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="flex max-w-[170px] mx-auto mb-4 z-20 items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10"
        >
          <motion.div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-gray-300 text-xs sm:text-sm font-medium">
            Available for work
          </span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 md:mb-6"
          >
            Let&apos;s create something great together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="text-sm sm:text-base md:text-lg text-gray-400 mb-12 sm:mb-16 max-w-xl mx-auto px-2"
          >
            I&apos;m not just here to design products;
            <br />
            I&apos;m here to connect with people.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
}
