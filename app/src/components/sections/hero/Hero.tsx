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
import ScrollIndicator from "@/app/src/components/ui/ScrollIndicator";
import {
  FaBuilding,
  FaRocket,
  FaStore,
  FaCloud,
  FaLaptop,
} from "react-icons/fa";

export default function Hero() {
  const [checkWorkHovered, setCheckWorkHovered] = useState(false);
  const [lahoreHovered, setLahoreHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
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
  const checkWorkY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const socialY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

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

  const marqueeItems = [
    { icon: FaLaptop, label: "INOVZONE" },
    { icon: FaRocket, label: "PURELOGICS" },
    { icon: FaBuilding, label: "ARBISOFT" },
    { icon: FaCloud, label: "ORM DIGITAL SOLUTIONS" },
    { icon: FaStore, label: "LAHORE GARRISON UNIVERSITY" },
    { icon: FaLaptop, label: "DFRSC" },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-12 pb-6 sm:pb-8 md:pb-10 overflow-x-hidden overflow-y-hidden bg-gray-100"
    >
      {/* 3D Plus Sign - Top Left with bounce animation only - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
          rotate: 0,
        }}
        transition={{
          opacity: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          scale: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          y: { duration: 2, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0 },
        }}
        className="hidden md:block absolute top-20 left-[15%] md:left-[18%] lg:left-[15%] w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 z-10"
      >
        <Image
          src="/assets/images/hero_3.png"
          alt="Plus sign"
          width={160}
          height={160}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </motion.div>

      {/* 3D Map Pin with Lahore Button - Left Side - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="hidden md:block absolute left-[10%] md:left-[4%] lg:left-[7%] bottom-32 md:bottom-40 z-10"
      >
        <div className="relative flex flex-col items-center">
          {/* Map Pin Image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
          >
            <Image
              src="/assets/images/hero_2.png"
              alt="Map pin"
              width={256}
              height={256}
              className="w-full h-full object-contain"
              priority
              unoptimized
            />
          </motion.div>

          {/* Lahore Button - anchored to pin center */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: lahoreY }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="absolute top-[95%] left-full -translate-x-1/2 px-3 py-2 rounded-lg bg-gray-800 text-white text-xs font-medium transition-colors shadow-lg min-w-[100px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setLahoreHovered(true)}
            onMouseLeave={() => setLahoreHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lahoreHovered ? "time" : "location"}
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

      {/* Check my work Button - Left Side with hover effect and scroll animation - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: checkWorkY }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="hidden md:block absolute left-[15%] md:left-[18%] lg:left-[22%] top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setCheckWorkHovered(true)}
        onMouseLeave={() => setCheckWorkHovered(false)}
      >
        <div className="relative">
          <motion.a
            href="#works"
            className="px-2.5 py-1 rounded-l-full rounded-br-full bg-blue-400 text-white text-xs font-medium hover:bg-blue-400 hover:rounded-full transition-colors inline-flex items-center justify-center gap-1.5 shadow-lg min-w-[110px]"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2.5,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={checkWorkHovered ? "click-me" : "check-work"}
                className="flex"
              >
                {(checkWorkHovered ? "Click me" : "Check my work")
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

          {/* Floating Arrow Cursor with Animation */}
          <AnimatePresence>
            {!checkWorkHovered && (
              <motion.div
                className="absolute -top-6 -right-6 w-5 h-5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: [0, 5, 0],
                  y: [0, -3, 0],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.2 },
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content - Center */}
      <div className="relative z-10 text-center max-w-2xl mx-auto w-full px-2 sm:px-0">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="flex flex-col items-center mb-12 sm:mb-16"
        >
          <motion.div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 sm:mb-3 bg-gray-200 shadow-xl ring-1 ring-white border-2 border-gray-100">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/assets/images/profile.jpeg"
                alt="Naveed Ul Aziz"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Naveed Ul Aziz
          </motion.h2>
          <motion.p
            className="text-xs md:text-sm text-gray-500 font-medium px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Technology Leader & Software Architect
          </motion.p>
        </motion.div>

        {/* Main Headline with stagger animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-6xl font-semibold text-gray-700 leading-tight sm:leading-snug mb-4 sm:mb-6 tracking-tight break-words hyphens-auto"
        >
          Building Digital Products That Impact Millions
        </motion.h1>

        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.85,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed"
        >
          I lead Royal Swift Services, Best Deal Marketing, Al Hamad Developers,
          Ayyan Developer, and Global Eco Group to move capital, land, and ESG
          mandates from Lahore to Dubai with transparent reporting and on-ground
          delivery.
        </motion.p> */}

        {/* Let's talk Button - Center Below Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.9,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
        >
          <motion.a
            href="#contact"
            className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-[#FF4D4D] text-white text-sm sm:text-base font-medium hover:bg-[#FF3333] transition-colors shadow-xl shadow-red-200"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 77, 77, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s talk!
          </motion.a>
        </motion.div>

        {/* Company Names - Scrolling from right to left - Below Let's talk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.1,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="relative w-full mt-6 sm:mt-8 md:mt-16 xl:mt-24"
        >
          <div className="relative overflow-hidden mx-auto max-w-3xl">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 whitespace-nowrap marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.label}-${idx}`}
                    className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
                  >
                    <Icon className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg" />
                    <span className="text-gray-700 text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Hand - RIGHT Side - Overflowing beyond right edge with thumbs up and floating animation */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: -20, scale: 0.8 }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: [0, -8, 8, -5, 5, 0],
          scale: [0.8, 1.08, 1, 1.03, 1],
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
        className="hidden lg:block absolute right-0 top-1/8 bottom-24 md:bottom-28 lg:bottom-32 w-[25rem] h-[25rem] md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem] xl:w-[45rem] xl:h-[45rem] z-10"
        style={{
          y: isScrolling ? 0 : springY,
          right: "-12%",
          bottom: "16%",
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/assets/images/hand.png"
          alt="3D Hand"
          width={100}
          height={100}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </motion.div>

      {/* Drop me a follow Button with Social Icons Below - moved closer to center with scroll animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: socialY }}
        transition={{ duration: 0.8, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="hidden md:block absolute right-[15%] md:right-[18%] lg:right-[20%] top-32 md:top-40 z-20"
      >
        <div
          className="flex flex-col items-center gap-3"
          onMouseEnter={() => setSocialHovered(true)}
          onMouseLeave={() => setSocialHovered(false)}
        >
          <motion.button
            className="px-4 py-2 rounded-lg bg-gray-800 text-white text-xs font-medium hover:bg-black transition-colors shadow-lg"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2.5,
                delay: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Drop me a follow
          </motion.button>

          {/* Social Icons - Appear Below on Hover */}
          <AnimatePresence>
            {socialHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] shadow-lg"
              >
                {/* Twitter/X */}
                <motion.a
                  href="https://x.com/chhnaveedulaziz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
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
                  href="https://www.linkedin.com/in/naveedulaziz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
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

                {/* Whatsaapp */}
                <motion.a
                  href="https://api.whatsapp.com/send?phone=923107779772&text=Lets%20Discuss%20Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg 
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"/>
                  </svg>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scroll Indicator - Lower Right - moved closer to center with scroll animation */}
      <motion.div
        className="hidden md:block absolute right-[15%] md:right-[18%] lg:right-[20%] bottom-32 md:bottom-48 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: scrollIndicatorY }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
