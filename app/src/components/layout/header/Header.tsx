"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../navigation/Nav";
import { navigationItems } from "@/app/src/constants";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Show header on scroll up, hide on scroll down
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Check if header is over the Contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const headerHeight = 64; // Approximate header height

        // Check if the top of the viewport (where header is) overlaps with contact section
        setIsOverDarkSection(
          contactRect.top <= headerHeight && contactRect.bottom > 0
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 transition-colors duration-300 ${
          isMobileMenuOpen ? "z-[60]" : "z-50"
        } bg-transparent`}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 md:h-16 gap-3">
            {/* Brand - anchored left with dynamic color */}
            <motion.a
              href="/"
              className={`text-xl md:text-2xl font-semibold flex-shrink-0 transition-all duration-300 ${
                isOverDarkSection ? "text-white" : "text-black"
              } ${
                isMobileMenuOpen
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
              style={{ fontFamily: "var(--font-dancing-script)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Naveed Ul Aziz
            </motion.a>

            {/* Desktop Navigation - centered */}
            <motion.div
              animate={{
                opacity: isVisible && !isMobileMenuOpen ? 1 : 0,
                y: isVisible && !isMobileMenuOpen ? 0 : -10,
                pointerEvents: isVisible && !isMobileMenuOpen ? "auto" : "none",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden md:flex flex-1 justify-center"
            >
              <Nav isOverDarkSection={isOverDarkSection} />
            </motion.div>

            {/* Let's connect Button - right aligned with dynamic text color */}
            <div
              className={`hidden md:flex justify-end flex-shrink-0 transition-opacity duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <motion.a
                href="#contact"
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                  isOverDarkSection
                    ? "text-white bg-gray-600 hover:bg-blue-400"
                    : "text-white bg-gray-900 hover:bg-blue-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s connect
              </motion.a>
            </div>

            {/* Mobile Menu Button with dynamic color */}
            <button
              className="md:hidden flex flex-col gap-1 ml-auto z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: 45, y: 6, backgroundColor: "#000" }
                    : {
                        rotate: 0,
                        y: 0,
                        backgroundColor: isOverDarkSection ? "#fff" : "#000",
                      }
                }
                className="w-6 h-0.5 transition-colors"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { opacity: 0 }
                    : {
                        opacity: 1,
                        backgroundColor: isOverDarkSection ? "#fff" : "#000",
                      }
                }
                className="w-6 h-0.5 transition-colors"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -6, backgroundColor: "#000" }
                    : {
                        rotate: 0,
                        y: 0,
                        backgroundColor: isOverDarkSection ? "#fff" : "#000",
                      }
                }
                className="w-6 h-0.5 transition-colors"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-white flex flex-col px-3 sm:px-4 md:px-6 pt-0 pb-8"
          >
            {/* Mobile Menu Header Area (Logo) */}
            <div className="h-12 md:h-16 flex items-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-[#ff6b4a] px-5 py-2 rounded-full shadow-md"
              >
                <span
                  className="text-black text-xl font-bold"
                  style={{ fontFamily: "var(--font-dancing-script)" }}
                >
                  Abdul Rehman
                </span>
              </motion.div>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-6">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const targetId = item.href.replace("#", "");
                    const element = document.getElementById(targetId);
                    if (element) {
                      const offsetTop = element.offsetTop - 64;
                      window.scrollTo({ top: offsetTop, behavior: "smooth" });
                    }
                  }}
                  className="text-[32px] font-medium text-gray-400 hover:text-black transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Footer Button */}
            <div className="mt-auto">
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-5 bg-[#2d2e32] text-white rounded-[28px] flex items-center justify-center text-lg font-medium shadow-lg active:scale-[0.98] transition-transform"
              >
                Let&apos;s connect
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
