import Link from 'next/link';
import { Metadata } from 'next';
import { UserLoginForm } from '~/components/user-login-form';

export const metadata: Metadata = {
  title: 'Voxly - Login',
  description: 'Login page',
};

export default function LoginPage() {
  return (
    <>
      <div className='container flex h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Log in to your account
              </h1>
            </div>
            <UserLoginForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              if you don't have an account{' '}
              <Link
                href='/signup'
                className='underline underline-offset-4 hover:text-primary'
              >
                Signup
              </Link>
            </p>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              Forgot your password{' '}
              <Link
                href='/reset-password'
                className='underline underline-offset-4 hover:text-primary'
              >
                Reset it now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
