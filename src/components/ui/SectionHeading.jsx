import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-4 inline-block relative">
        {title}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent"
        />
      </h2>
      {subtitle && (
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mt-6 text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
