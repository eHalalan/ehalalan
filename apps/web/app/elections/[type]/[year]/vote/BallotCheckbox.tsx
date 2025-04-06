'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

function BallotCheckbox({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'min-w-8 w-8 h-6 rounded-[50%] border-2 border-foreground',
        'data-[state=checked]:bg-foreground data-[state=checked]:border-foreground',
        'data-[state=checked]:text-foreground',
        'transition-all duration-300 ease-in-out',
        'text-foreground data-[state=checked]:text-background font-bold',
        'flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </CheckboxPrimitive.Root>
  );
}

export { BallotCheckbox };
