'use client';

import * as React from 'react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import Link from 'next/link';
import { useToast } from '~/components/ui/use-toast';
import { setCookie, getCookie } from 'cookies-next';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { FormSchema, loginSchema } from './validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '~/components/ui/spinner';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginAccountForm({ className, ...props }: UserAuthFormProps) {
  const token = getCookie('auth-token');
  const router = useRouter();

  if (token) {
    router.push('/feed');
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  async function onSubmit(data: FormSchema) {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const fetchedData = await response.json();
      if (!response.ok) {
        toast({
          variant: 'destructive',
          description: `${JSON.stringify(fetchedData.message, null, 2)}`,
        });
        setLoading(false);
        return;
      } else {
        setCookie('auth-token', fetchedData.token, {
          path: '/',
          maxAge: 60 * 60 * 60 * 2.8,
        });
        toast({
          description: 'You successfully Logged in',
        });
        setLoading(false);
        router.push('/feed');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mt-2 grid gap-4'>
            <div className='my-2'>
              <p className='text-sm text-neutral-500'>
                <Link href='/reset-password' className='underline'>
                  Forgot your password?
                </Link>
              </p>
            </div>
            <div className='grid gap-2'>
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs text-neutral-500'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Your email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-2'>
              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs text-neutral-500'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='my-8 flex items-center space-x-4'>
            <Button
              className='disabled:cursor-not-allowed disabled:opacity-50'
              type='submit'
              disabled={loading}
              style={{ borderRadius: '0.3rem' }}
            >
              {loading ? <Spinner /> : 'Login'}
            </Button>
            <p className='text-sm'>
              Don&apos;t have an account?{' '}
              <Link
                href='/signup'
                className='text-neutral-500 underline underline-offset-4 hover:text-neutral-800'
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
