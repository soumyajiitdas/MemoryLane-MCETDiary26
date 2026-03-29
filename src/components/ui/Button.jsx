import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-amber)] text-black hover:bg-[var(--color-amber-light)] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] active:scale-95",
    secondary: "glass hover:bg-[var(--color-glass)] text-[var(--color-text)] border border-[var(--color-amber-glow)] hover:border-[var(--color-amber)] active:scale-95",
    ghost: "text-[var(--color-text-muted)] hover:text-[var(--color-amber)] hover:bg-[var(--color-glass)] active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
