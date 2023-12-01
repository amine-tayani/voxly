import Link from 'next/link';
import { Metadata } from 'next';
import { UserSignupForm } from '~/components/user-signup-form';

export const metadata: Metadata = {
  title: 'Voxly - Sign up',
  description: 'Signup page',
};

export default function SignupPage() {
  return (
    <>
      <div className='container flex h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Create an account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email below to create your account
              </p>
            </div>
            <UserSignupForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              Already have an account{' '}
              <Link
                href='/login'
                className='underline underline-offset-4 hover:text-primary'
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
