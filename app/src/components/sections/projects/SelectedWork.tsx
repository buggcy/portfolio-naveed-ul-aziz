"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { projects } from "@/app/src/constants";
import ProjectCard from "@/app/src/components/ui/cards/ProjectCard";
import ScrollAnimation from "@/app/src/components/ui/ScrollAnimation";
import ProjectModal from "@/app/src/components/ui/modals/ProjectModal";
import { Project } from "@/app/src/types";

const HIGHLIGHT_COUNT = 4;

export default function SelectedWork() {
  const titleRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const highlightProjects = projects.slice(0, HIGHLIGHT_COUNT);
  const remainingProjects = projects.slice(HIGHLIGHT_COUNT);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      checkScroll();
      carousel.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        carousel.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [remainingProjects]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        carouselRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="works"
      className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          ref={titleRef}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center"
        >
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-1 sm:mb-2 md:mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Flagship ventures
          </motion.h2>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-gray-400 text-xs sm:text-sm md:text-base font-light tracking-wide px-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            E-commerce · Logistics · Travel Tech · Media Platforms
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-[1100px] mx-auto">
          {/* First row: 8 grid + 4 grid */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8">
            <ScrollAnimation delay={0.1}>
              <ProjectCard
                project={highlightProjects[0]}
                index={0}
                onClick={() => handleProjectClick(highlightProjects[0])}
              />
            </ScrollAnimation>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <ScrollAnimation delay={0.2}>
              <ProjectCard
                project={highlightProjects[1]}
                index={1}
                onClick={() => handleProjectClick(highlightProjects[1])}
              />
            </ScrollAnimation>
          </div>

          {/* Second row: 4 grid + 8 grid (content swapped) */}
          {highlightProjects[3] && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
              <ScrollAnimation delay={0.3}>
                <ProjectCard
                  project={highlightProjects[3]}
                  index={3}
                  onClick={() => handleProjectClick(highlightProjects[3])}
                />
              </ScrollAnimation>
            </div>
          )}
          {highlightProjects[2] && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-8">
              <ScrollAnimation delay={0.4}>
                <ProjectCard
                  project={highlightProjects[2]}
                  index={2}
                  onClick={() => handleProjectClick(highlightProjects[2])}
                />
              </ScrollAnimation>
            </div>
          )}
        </div>

        {/* Remaining Projects Section - Horizontal Carousel */}
        {remainingProjects.length > 0 && (
          <div className="mt-16 md:mt-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-8 text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              More Projects
            </motion.h3>

            <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
              {/* Left scroll button */}
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scroll("left")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Right scroll button */}
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scroll("right")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Horizontal scrolling container */}
              <div
                ref={carouselRef}
                className="overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-12"
              >
                <div className="flex gap-4 sm:gap-6 md:gap-8 pb-4">
                  {remainingProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="flex-none w-[280px] sm:w-[320px] md:w-[360px]"
                    >
                      <ProjectCard
                        project={project}
                        index={HIGHLIGHT_COUNT + index}
                        onClick={() => handleProjectClick(project)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
