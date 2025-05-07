import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus-visible:ring-slate-500',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500',
    ghost: 'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
    warning: 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{children}</span>
        </div>
      );
    }
    
    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className="mr-2">{icon}</span>
          {children}
        </>
      );
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          <span className="ml-2">{icon}</span>
        </>
      );
    }
    
    return children;
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;