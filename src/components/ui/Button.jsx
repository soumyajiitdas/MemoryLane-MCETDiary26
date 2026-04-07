import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Button — variants: primary, secondary, ghost
 *   • primary: amber fill with shimmer sweep + scale spring
 *   • secondary: glass with amber border glow on hover
 *   • ghost: subtle, minimal
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const baseStyle = {
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'inherit',
    fontWeight: 500,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#0d0a06',
      boxShadow: '0 2px 12px rgba(245,158,11,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
      border: '1px solid rgba(245,158,11,0.3)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.04)',
      color: 'var(--color-text)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      border: '1px solid rgba(245,158,11,0.25)',
      backdropFilter: 'blur(12px)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-muted)',
      border: '1px solid transparent',
    },
  };

  const hoverEffects = {
    primary: { scale: 1.04, boxShadow: '0 6px 24px rgba(245,158,11,0.45), inset 0 1px 0 rgba(255,255,255,0.2)' },
    secondary: { scale: 1.03, boxShadow: '0 4px 20px rgba(245,158,11,0.15), 0 0 0 1px rgba(245,158,11,0.4)', borderColor: 'rgba(245,158,11,0.5)' },
    ghost: { color: 'rgba(245,158,11,1)', background: 'rgba(245,158,11,0.07)' },
  };

  const tapEffect = { scale: 0.97 };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
      className={`inline-flex items-center justify-center ${sizes[size]} ${className}`}
      whileHover={!disabled ? hoverEffects[variant] : {}}
      whileTap={!disabled ? tapEffect : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Shimmer sweep overlay for primary */}
      {variant === 'primary' && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-sweep 3s linear infinite',
            borderRadius: 'inherit',
          }}
          aria-hidden="true"
        />
      )}
      {/* Glass shimmer for secondary on hover */}
      {variant === 'secondary' && (
        <span
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)',
            borderRadius: 'inherit',
          }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
