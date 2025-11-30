import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false, 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-300 rounded-full tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#C1FF72] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(193,255,114,0.4)] border border-transparent",
    secondary: "bg-white text-black hover:bg-gray-200 border border-transparent",
    outline: "bg-transparent text-white border border-neutral-700 hover:border-[#C1FF72] hover:text-[#C1FF72]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
      {icon && !isLoading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
    </button>
  );
};