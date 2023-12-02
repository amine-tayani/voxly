'use client';

import { useCallback, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useAuth } from '~/lib/auth';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const fetchCurrentUser = async () => {
    const { email } = await useAuth();
    setEmail(email);
  };
  useEffect(() => {
    fetchCurrentUser();
  });

  const logout = useCallback(() => {
    deleteCookie('auth-token');
    router.push('/login');
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src='https://cdn-icons-png.flaticon.com/512/847/847969.png'
              alt='User avatar'
            />
            <AvatarFallback>Av</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{email}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logout}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
