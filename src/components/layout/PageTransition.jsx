import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -15,
    skewY: 1.5,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    skewY: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    rotateY: 15,
    skewY: -1.5,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
      style={{ transformOrigin: "left center", transformStyle: "preserve-3d", perspective: "1500px" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
