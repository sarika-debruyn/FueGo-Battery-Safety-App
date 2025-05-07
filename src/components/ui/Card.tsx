import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hasBorder?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  children,
  footer,
  className = '',
  hasBorder = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hasBorder ? 'border border-slate-200' : ''} ${className}`}>
      {(title || subtitle || icon) && (
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-slate-500">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-medium text-slate-800">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">{footer}</div>}
    </div>
  );
};

export default Card;