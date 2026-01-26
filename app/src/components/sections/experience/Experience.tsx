"use client";

import { motion } from "framer-motion";
import { experiences } from "@/app/src/constants";
import ExperienceCard from "@/app/src/components/ui/cards/ExperienceCard";
import ScrollAnimation from "@/app/src/components/ui/ScrollAnimation";
import { staggerContainer, fadeInUp } from "@/app/src/utils/animations";

export default function Experience() {
  const handleDownloadCV = () => {
    // Add your CV download logic here
    // For now, this is a placeholder
    window.open("/assets/cv.pdf", "_blank");
  };

  return (
    <section
      id="experience"
      className="py-10 md:py-14 lg:py-18 px-4 md:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-6 md:mb-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl lg:text-3xl text-center font-medium text-gray-900 mb-2"
          >
            Recent experience
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gray-100 rounded-xl p-3 md:p-6 lg:p-8 overflow-hidden"
        >
          <div className="divide-y divide-gray-200">
            {experiences.map((experience, index) => (
              <ScrollAnimation key={experience.id} delay={index * 0.1}>
                <ExperienceCard experience={experience} index={index} />
              </ScrollAnimation>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center mt-6 md:mt-8">
            <motion.button
              onClick={handleDownloadCV}
              className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-sm md:text-base font-medium shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
