'use client';

import Link from 'next/link';
import { cn } from '~/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/home'
        className='text-sm font-medium transition-colors hover:text-primary'
      >
        Home
      </Link>
      <Link
        href='/questions'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Questions
      </Link>
      <Link
        href='/questions'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Login
      </Link>
    </nav>
  );
}
