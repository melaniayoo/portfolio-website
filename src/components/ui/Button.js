// src/components/ui/Button.js
export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '',
  ...props 
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: '',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}