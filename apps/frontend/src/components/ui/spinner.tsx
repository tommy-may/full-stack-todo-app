import { RiLoaderLine } from '@remixicon/react';

import { cn } from '@/lib/utils';

function Spinner({ className, children, ...props }: React.ComponentProps<'svg'>) {
  return (
    <RiLoaderLine
      aria-label='Loading'
      className={cn('size-4 animate-spin', className)}
      role='status'
      {...props}
    />
  );
}

export { Spinner };
