import * as React from "react"
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex items-center border-2 border-slate-100 h-10 w-96 px-3 rounded-md bg-slate-50 hover:bg-secondary text-lg ring-offset-background file:border-0  file:text-sm file:font-medium file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export default Input;
