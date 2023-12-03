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
        <h1 className='text-xl font-semibold'>Voxly</h1>
      </Link>
      <Link
        href='/favourites'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Favourites
      </Link>
      <Link
        href='/login'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Login
      </Link>
    </nav>
  );
}
