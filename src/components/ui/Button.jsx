const styles = {
  base: 'inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-200 whitespace-nowrap',

  // variants
  primary:   'bg-pink text-white hover:bg-pinkDeep shadow-sm hover:shadow-md',
  outline:   'bg-transparent text-plum border border-plum/30 hover:border-plum hover:bg-plum/5',

  // sizes
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const classes = `${styles.base} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}